# Security Policy

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

### Responsible Disclosure

If you discover a security vulnerability in this portfolio application, please email me privately instead of posting it publicly. This allows us to:

1. Assess the vulnerability
2. Develop a fix
3. Release the fix before disclosure
4. Give credit to the reporter (if desired)

### How to Report

1. Send an email to: `[your-secure-email-contact]`
2. Include:
   - Description of the vulnerability
   - Steps to reproduce (if applicable)
   - Potential impact assessment
   - Suggested fix (optional)
   - Your contact information (optional)

### Response Process

- **Initial response:** Within 24 hours
- **Assessment:** 3-5 days
- **Fix and deployment:** 1-2 weeks
- **Public disclosure:** After fix is deployed

### Supported Versions

| Version | Supported |
|---------|-----------|
| Latest | ✅ Yes |
| Older versions | ⚠️ Case-by-case |

---

## Security Best Practices

This section documents security best practices for using and contributing to this application.

### For Users

1. **Always Use HTTPS**
   - All connections are encrypted
   - HSTS enforces HTTPS for 1 year

2. **External Links**
   - All external links are validated before opening
   - Verify URLs before clicking on unfamiliar links
   - Report suspicious links

3. **Report Phishing**
   - If you receive phishing emails pretending to be from this portfolio:
     - Do not click links or download attachments
     - Report to your email provider
     - Email security concerns to [contact]

### For Developers

#### Security Testing Before Committing

```bash
# Check dependencies for vulnerabilities
npm audit

# Run ESLint with security rules
npm run lint

# Build and verify no source maps
npm run build
ls dist/**/*.map  # Should be empty

# Use URL validation for external links
import { isValidUrl } from './utils/securityUtils';
if (isValidUrl(url)) { /* safe to use */ }
```

#### Git Hygiene

- Never commit `.env`, `.env.local`, or files with secrets
- Use `.env.example` as a template
- Review `.gitignore` before committing
- Check commit history for accidentally committed secrets:
  ```bash
  git log -p | grep -i "password\|token\|secret\|api"
  ```

#### Code Review Checklist

- [ ] No hardcoded API keys or passwords
- [ ] All external URLs validated with `isValidUrl()`
- [ ] No use of `dangerouslySetInnerHTML` or `eval()`
- [ ] All user inputs sanitized with `sanitizeText()`
- [ ] All email inputs validated with `isValidEmail()`
- [ ] No console logging of sensitive data
- [ ] Dependencies are up-to-date and audited

---

## Security Headers

All security headers are configured in `netlify.toml`:

### Content-Security-Policy (CSP)
Restricts where resources can load from to prevent XSS attacks.

### Strict-Transport-Security (HSTS)
Enforces HTTPS connections and prevents downgrade attacks.

### X-Frame-Options
Prevents clickjacking by disallowing framing.

### X-Content-Type-Options
Prevents MIME type sniffing.

### Referrer-Policy
Controls referrer header to prevent information leakage.

### Permissions-Policy
Disables unnecessary browser features and APIs.

---

## Dependency Management

### Staying Secure

1. **Regular Updates**
   ```bash
   npm audit           # Check for vulnerabilities
   npm update          # Update to latest safe versions
   npm audit fix       # Automatically fix common issues
   ```

2. **Automated Checks**
   - GitHub Dependabot enabled
   - Automatic security PRs created
   - Review and merge security updates

3. **Checking for Compromised Packages**
   ```bash
   npm audit
   npm audit fix
   ```

---

## Incident Response

### If You Find a Security Issue

1. **Report Privately**
   - Email immediately with details
   - Do not post on social media or GitHub

2. **What Happens Next**
   - We acknowledge receipt within 24 hours
   - We assess and confirm the issue
   - We develop and test a fix
   - We deploy the fix
   - We notify the community

---

## Security Monitoring

### Regular Security Maintenance

- **Weekly:** GitHub notifications for security advisories
- **Monthly:** `npm audit` and `npm update`
- **Quarterly:** Full security review
- **Annually:** Comprehensive security audit

---

## Compliance

This application follows:
- ✅ OWASP Top 10 mitigations
- ✅ GDPR privacy practices
- ✅ Web security best practices
- ✅ Industry security standards

---

## Questions?

For security-related questions (not vulnerability reports), open a GitHub discussion or email [contact].

---

**Last Updated:** 2026-06-13
