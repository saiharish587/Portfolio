# Security Policy

## Reporting Security Vulnerabilities

I take security seriously. If you discover a security vulnerability in this portfolio application, please report it responsibly.

### How to Report

1. **Do NOT** open a public GitHub issue
2. **Do NOT** post about it on social media
3. **Instead**, email: [security contact - set this up in private]

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial response:** Within 24 hours
- **Assessment:** 3-5 days
- **Fix deployment:** 1-2 weeks

### Responsible Disclosure

I commit to:
- Acknowledging your report within 24 hours
- Confirming the vulnerability with you
- Developing a fix
- Coordinating a reasonable timeline for disclosure

---

## Security Best Practices for This Application

### For Users

1. **Always use HTTPS**
   - All connections are encrypted
   - HSTS enforces HTTPS for 1 year

2. **Be cautious with external links**
   - Links are validated before opening
   - Always verify the URL before clicking unfamiliar links

3. **Report phishing**
   - If you receive phishing emails pretending to be from this portfolio:
     - Do not click links
     - Report to your email provider
     - Email me at [contact]

### For Developers

#### Adding Features Securely

1. **URL Handling**
   ```javascript
   import { isValidUrl } from './utils/securityUtils';
   
   // Always validate external URLs
   if (isValidUrl(userProvidedUrl)) {
     // Safe to use
   }
   ```

2. **Text Content**
   ```javascript
   import { sanitizeText } from './utils/securityUtils';
   
   // Always sanitize user input
   const safe = sanitizeText(userInput);
   ```

3. **Email Validation**
   ```javascript
   import { isValidEmail } from './utils/securityUtils';
   
   if (isValidEmail(email)) {
     // Process email
   }
   ```

#### Before Committing

```bash
# Check for security issues
npm audit

# Run linter with security rules
npm run lint

# Build and verify security headers
npm run build

# Check bundle for secrets (install via npm install -g detect-secrets)
detect-secrets scan
```

#### Environment Variables

1. Create `.env.local` (never commit):
   ```env
   VITE_API_URL=https://api.example.com
   VITE_ENABLE_ANALYTICS=true
   ```

2. Use in code:
   ```javascript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

3. Always add to `.gitignore`:
   ```
   .env
   .env.local
   .env.*.local
   ```

---

## Security Headers Explanation

The `netlify.toml` file configures these security headers:

### Content-Security-Policy (CSP)
Prevents XSS attacks by controlling resource loading.
- `default-src 'self'` - Only resources from same origin
- `script-src 'self' 'wasm-unsafe-eval'` - Only trusted scripts
- `style-src 'self' 'unsafe-inline'` - CSS from trusted sources
- `img-src 'self' data: https:` - Images from trusted sources

### Strict-Transport-Security (HSTS)
Enforces HTTPS connections.
- Valid for 1 year
- Applied to all subdomains
- Eligible for browser HSTS preload list

### X-Frame-Options
Prevents clickjacking attacks.
- `DENY` - Cannot be framed by any site

### X-Content-Type-Options
Prevents MIME type sniffing.
- `nosniff` - Browsers respect Content-Type header

### Referrer-Policy
Controls referrer information.
- `strict-origin-when-cross-origin` - Minimal referrer leakage

### Permissions-Policy
Disables unnecessary browser features.
- Geolocation disabled
- Microphone disabled
- Camera disabled
- Payment APIs disabled

---

## Dependency Security

### Keeping Dependencies Safe

1. **Regular Updates**
   ```bash
   npm update          # Update to latest versions
   npm audit           # Check for vulnerabilities
   npm audit fix       # Auto-fix common issues
   ```

2. **Automated Updates (GitHub)**
   - Dependabot checks dependencies daily
   - Opens pull requests for security updates
   - Configure in `.github/dependabot.yml`

3. **Supply Chain Security**
   - Only use packages from official npm registry
   - Check package maintainer before installing
   - Review package.json before installing dependencies
   - Use `npm ci` for reproducible builds

---

## Testing Security

### Manual Testing

1. **CSP Validation**
   - Visit https://csp-evaluator.withgoogle.com/
   - Paste your CSP header
   - Review recommendations

2. **Security Headers**
   - Visit https://securityheaders.com/
   - Enter your domain
   - Verify all headers present

3. **HTTPS/SSL**
   - Visit https://www.ssl-labs.com/ssltest/
   - Enter your domain
   - Verify SSL configuration

### Automated Testing

```bash
# Dependency vulnerability scanning
npm audit

# Code linting with security rules
npm run lint

# Build verification (no source maps)
npm run build && ls dist/**/*.map

# Check for secrets in code
npx detect-secrets scan
```

---

## Incident Response

### If You Discover a Breach

1. **Do not panic** - Static sites have limited attack surface
2. **Assess the impact** - What data was accessed?
3. **Contain the breach** - Invalidate compromised credentials
4. **Notify users** - Transparency is important
5. **Fix the issue** - Deploy security updates
6. **Document the incident** - Learn from mistakes

### Contact

For security incidents: [Set up security contact]

---

## Security Roadmap

### Implemented ✅
- [x] Strong CSP headers
- [x] HSTS enforcement
- [x] Clickjacking protection
- [x] URL validation
- [x] Secure build configuration
- [x] Environment variable handling
- [x] Security headers documentation

### Planned 🔄
- [ ] TypeScript adoption
- [ ] Error boundary implementation
- [ ] Subresource Integrity (SRI) hashes
- [ ] Security monitoring/logging
- [ ] Privacy policy
- [ ] Rate limiting (if backend added)

### Future Considerations 🔮
- [ ] Contact form with reCAPTCHA
- [ ] Analytics with privacy-first approach
- [ ] Form spam filtering
- [ ] Geographic access logging
- [ ] Security incident response plan

---

## Third-Party Security

### External Services Used

1. **Google Fonts**
   - ✅ Loaded over HTTPS
   - ✅ Restricted by CSP
   - ⚠️ Sends referrer to Google
   - 📝 Consider self-hosting for better privacy

2. **GitHub (Git Repository)**
   - ✅ All commits are public (expected)
   - ✅ No secrets in commit history
   - ✅ 2FA recommended for account

### Security of External Links

All external links are validated before opening:
- Protocol validation (http, https, mailto only)
- Domain verification
- Safe window opening with `noopener,noreferrer`
- User consent (manual click required)

---

## Security Contributors

Thank you to the security researchers and community members who've helped secure this application.

---

## Additional Resources

- [OWASP Security Best Practices](https://owasp.org/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Security Headers](https://securityheaders.com/)
- [SSL Labs Best Practices](https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)

---

**Last Updated:** 2026-06-13  
**Security Review Frequency:** Quarterly  
**Next Review:** 2026-09-13
