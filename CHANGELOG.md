# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-22

### Changed
- **Breaking**: Convenience functions now require password parameter instead of using environment variables
- Updated all examples to use class-based API
- Simplified README for better user experience

### Added
- Comprehensive TypeScript types
- CONTRIBUTING.md and SECURITY.md documentation
- MIT license

### Fixed
- Removed forced dependency on `LIVEBOX_PASSWORD` environment variable

## [1.0.0] - 2025-11-22

### Added
- Initial release of livebox-api
- LiveboxClient class for Orange Livebox API interaction
- Device discovery functionality
- DHCP settings and lease management
- System reboot capability
- Convenience functions for quick access
- Full TypeScript support
- ESLint configuration
- Example scripts

### Features
- List connected devices with detailed information
- Monitor DHCP pools and configurations
- View static and dynamic DHCP leases
- Remotely reboot Livebox router
- Modular service architecture