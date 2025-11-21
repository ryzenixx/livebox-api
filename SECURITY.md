# Security Policy

## Supported Versions

We take security seriously. This project follows these versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.1.x   | :white_check_mark: |
| < 1.1   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

### Contact
- **Email**: hello@maelduret.com
- **GitHub**: Open a private security advisory

### What to include
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline
- **Initial response**: Within 48 hours
- **Vulnerability assessment**: Within 7 days
- **Fix development**: Within 30 days for critical issues
- **Public disclosure**: After fix is deployed

## Security Considerations

### For Users
- Never commit your Livebox password to version control
- Use strong, unique passwords for your Livebox admin account
- Keep your Livebox firmware updated
- Only run this library on trusted networks

### For Contributors
- Review code for potential security issues
- Avoid logging sensitive information
- Use secure coding practices
- Validate all inputs

## Known Security Considerations

- This library requires admin access to your Livebox
- All API calls are made over HTTP (not HTTPS) to the local router
- Credentials are sent in each request
- No token-based authentication is implemented

## Responsible Disclosure

We kindly ask that you:
- Give us reasonable time to fix issues before public disclosure
- Avoid accessing systems without authorization
- Respect user privacy and data

Thank you for helping keep livebox-api secure! 🛡️