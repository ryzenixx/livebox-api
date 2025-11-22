## [1.2.1] - 2025-11-22

### Metadata
- Updated package informations in package.json

## [1.2.0] - 2025-11-22

### Added
- Added `addStaticDHCPLease()` and `deleteStaticDHCPLease()` methods for managing static DHCP leases

## [1.1.6] - 2025-11-22

### Fixed
- Moved `dotenv` to devDependencies as it's only used in examples

### Documentation
- Updated npm badge to use shields.io for better reliability

## [1.1.5] - 2025-11-22

### Fixed
- Replaced `node-fetch` with `undici` to eliminate deprecated dependency warning

## [1.1.4] - 2025-11-22

### Added
- Added `getStaticDHCPLeases()` and `getDynamicDHCPLeases()` convenience methods to `LiveboxClient` class

### Documentation
- Added GitHub badge to README.md

## [1.1.3] - 2025-11-22

### Documentation
- Updated changelog with complete version history

## [1.1.2] - 2025-11-22

### Metadata
- Updated author contact information (`hello@maelduret.com`)
- Updated security reporting email in SECURITY.md

## [1.1.0] - 2025-11-22

### Changed
- **Breaking**: Convenience functions now require password parameter instead of environment variables
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
- Full TypeScript support with comprehensive interfaces
- ESLint configuration for code quality
- Example scripts for all features
- Modular service architecture (devices, system, DHCP)

### Features
- List connected devices with detailed information (IP, MAC, device type, active status)
- Monitor DHCP pools and configurations
- View static and dynamic DHCP leases
- Remotely reboot Livebox router
- Both class-based and functional programming interfaces