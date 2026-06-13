/**
 * Security Utilities for the Portfolio Application
 * Provides functions to safely handle URLs, sanitization, and security checks
 */

/**
 * Validates if a URL is safe to navigate to
 * Prevents javascript: and data: URIs and other dangerous protocols
 * 
 * @param {string} url - The URL to validate
 * @param {Array<string>} allowedProtocols - Allowed protocols (default: ['http', 'https', 'mailto'])
 * @returns {boolean} - True if URL is safe
 */
export const isValidUrl = (url, allowedProtocols = ['http', 'https', 'mailto']) => {
  try {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Remove whitespace
    const trimmedUrl = url.trim();

    // Check for javascript: or data: URLs
    if (/^(javascript|data|vbscript):/i.test(trimmedUrl)) {
      console.warn('Blocked potentially dangerous URL:', trimmedUrl);
      return false;
    }

    // For mailto and tel protocols, just check format
    if (trimmedUrl.startsWith('mailto:')) {
      return /^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmedUrl);
    }

    if (trimmedUrl.startsWith('tel:')) {
      return /^tel:\+?[0-9\-\s()]+$/.test(trimmedUrl);
    }

    // For http/https, parse and validate
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
      try {
        const urlObj = new URL(trimmedUrl);
        const protocol = urlObj.protocol.slice(0, -1); // Remove trailing ':'
        return allowedProtocols.includes(protocol);
      } catch (e) {
        return false;
      }
    }

    // Relative URLs (fragments, local paths)
    if (trimmedUrl.startsWith('#') || trimmedUrl.startsWith('/')) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error validating URL:', error);
    return false;
  }
};

/**
 * Sanitizes text content to prevent XSS
 * Removes any HTML tags and special characters
 * 
 * @param {string} text - The text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  if (typeof text !== 'string') {
    return '';
  }

  // Create a temporary element to use browser's native escaping
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

/**
 * Validates email addresses
 * Uses a reasonable regex (not RFC 5322 complete, but practical)
 * 
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  if (typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Safely opens URLs in a new window/tab
 * Includes security mitigations for window.open()
 * 
 * @param {string} url - URL to open
 * @param {string} target - Target window ('_blank', '_self', etc.)
 * @returns {Window|null} - The opened window or null if blocked
 */
export const safeWindowOpen = (url, target = '_blank') => {
  if (!isValidUrl(url)) {
    console.warn('Blocking invalid URL:', url);
    return null;
  }

  // Always use noopener and noreferrer for security
  const features = target === '_blank' 
    ? 'noopener,noreferrer,width=800,height=600'
    : '';

  try {
    return window.open(url, target, features);
  } catch (error) {
    console.error('Error opening URL:', error);
    return null;
  }
};

/**
 * Validates external image URLs
 * Prevents loading images from untrusted sources
 * 
 * @param {string} url - Image URL to validate
 * @param {Array<string>} trustedDomains - List of trusted image domains
 * @returns {boolean} - True if image URL is safe
 */
export const isValidImageUrl = (url, trustedDomains = [
  'localhost',
  'imgur.com',
  'i.imgur.com',
  'gravatar.com',
  'i.pravatar.cc',
  'i.stack.imgur.com',
]) => {
  try {
    if (!url || typeof url !== 'string') {
      return false;
    }

    // Data URLs are acceptable for inline images
    if (url.startsWith('data:image/')) {
      return true;
    }

    // Relative URLs are safe
    if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
      return true;
    }

    // Parse and validate URL
    const urlObj = new URL(url, window.location.origin);
    const protocol = urlObj.protocol;

    // Only allow http/https
    if (!['http:', 'https:'].includes(protocol)) {
      return false;
    }

    // Check if domain is trusted
    const hostname = urlObj.hostname;
    return trustedDomains.some(domain => hostname.includes(domain));
  } catch (error) {
    console.warn('Invalid image URL:', url, error);
    return false;
  }
};

/**
 * Generates a Content Security Policy nonce for inline scripts
 * (Note: For production use, this should be generated server-side)
 * 
 * @returns {string} - Random nonce value
 */
export const generateNonce = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validates origin for CORS requests
 * 
 * @param {string} origin - Origin to validate
 * @param {Array<string>} allowedOrigins - List of allowed origins
 * @returns {boolean} - True if origin is allowed
 */
export const isValidOrigin = (origin, allowedOrigins = []) => {
  if (!origin || typeof origin !== 'string') {
    return false;
  }

  try {
    const originUrl = new URL(origin);
    const allowedUrl = allowedOrigins.map(o => new URL(o));
    return allowedUrl.some(allowed => 
      allowed.hostname === originUrl.hostname &&
      allowed.protocol === originUrl.protocol
    );
  } catch (error) {
    return false;
  }
};

/**
 * Checks if code is running in development mode
 * @returns {boolean}
 */
export const isDevelopment = () => {
  return import.meta.env.DEV;
};

/**
 * Checks if code is running in production mode
 * @returns {boolean}
 */
export const isProduction = () => {
  return import.meta.env.PROD;
};

/**
 * Logs security events (only in development)
 * 
 * @param {string} event - Event type
 * @param {any} details - Event details
 */
export const logSecurityEvent = (event, details) => {
  if (isDevelopment()) {
    console.warn(`[SECURITY] ${event}:`, details);
  }
  // In production, consider sending to a logging service
};

/**
 * Prevents CSRF attacks by validating form submissions
 * Generates a CSRF token (Note: This is client-side; server should validate)
 * 
 * @returns {string} - CSRF token
 */
export const generateCsrfToken = () => {
  const token = generateNonce();
  if (typeof window !== 'undefined') {
    window.__csrf_token__ = token;
  }
  return token;
};

/**
 * Gets stored CSRF token
 * @returns {string|null}
 */
export const getCsrfToken = () => {
  return typeof window !== 'undefined' ? window.__csrf_token__ : null;
};

export default {
  isValidUrl,
  sanitizeText,
  isValidEmail,
  safeWindowOpen,
  isValidImageUrl,
  generateNonce,
  isValidOrigin,
  isDevelopment,
  isProduction,
  logSecurityEvent,
  generateCsrfToken,
  getCsrfToken,
};
