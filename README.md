# Livebox API

[![npm version](https://img.shields.io/npm/v/livebox-api.svg)](https://www.npmjs.com/package/livebox-api)
[![GitHub](https://img.shields.io/badge/GitHub-ryzenixx%2Flivebox--api-blue.svg)](https://github.com/ryzenixx/livebox-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TypeScript library for Orange Livebox API - manage devices, DHCP, and system controls.

## Installation

```bash
npm install livebox-api
```

## Quick Start

### Using LiveboxClient

```typescript
import { LiveboxClient } from 'livebox-api';

const client = new LiveboxClient('192.168.1.1', 'admin', 'your_password');

// Get connected devices
const devices = await client.getConnectedDevices();

// Get DHCP settings
const dhcp = await client.getDHCPSettings();

// Reboot Livebox
await client.rebootLivebox();
```

### Using Convenience Functions

```typescript
import { getConnectedDevices, getDHCPSettings } from 'livebox-api';

// Functions require password parameter
const devices = await getConnectedDevices('your_password');
const dhcp = await getDHCPSettings('your_password');
```

## API Overview

### LiveboxClient Methods

| Method | Description |
|--------|-------------|
| `getConnectedDevices()` | List all connected devices |
| `getDHCPSettings()` | Get DHCP pool configurations |
| `getStaticDHCPLeases(pool?)` | Get static DHCP leases |
| `getDynamicDHCPLeases(pool?)` | Get dynamic DHCP leases |
| `addStaticDHCPLease(lease)` | Add a static DHCP lease |
| `deleteStaticDHCPLease(lease)` | Delete a static DHCP lease |
| `rebootLivebox()` | Reboot the Livebox |

### Convenience Functions

All functions take `(password, hostname?, username?)` parameters:

- `getConnectedDevices(password, hostname?, username?)`
- `getDHCPSettings(password, hostname?, username?)`
- `getStaticDHCPLeases(password, pool?, hostname?, username?)`
- `getDynamicDHCPLeases(password, pool?, hostname?, username?)`
- `addStaticDHCPLease(lease, password, hostname?, username?)`
- `deleteStaticDHCPLease(lease, password, hostname?, username?)`
- `rebootLivebox(password, hostname?, username?)`

## Examples

### Device Management

```typescript
const client = new LiveboxClient('192.168.1.1', 'admin', 'password');
const devices = await client.getConnectedDevices();

devices.forEach(device => {
  console.log(`${device.Name}: ${device.IPAddress} (${device.Active ? 'Active' : 'Inactive'})`);
});
```

### DHCP Management

```typescript
// Get DHCP settings
const dhcp = await client.getDHCPSettings();

// Add a static DHCP lease
await client.addStaticDHCPLease({
  mac: "AA:BB:CC:DD:EE:FF",
  ip: "192.168.1.100",
  alias: "My Device",
});

// Get static leases
const staticLeases = await client.getStaticDHCPLeases();

// Delete a static DHCP lease
await client.deleteStaticDHCPLease({
  mac: "AA:BB:CC:DD:EE:FF",
});
```

### System Control

```typescript
await client.rebootLivebox();
console.log('Livebox rebooting...');
```

## License

MIT

---

[Contributing](https://github.com/ryzenixx/livebox-api/blob/main/CONTRIBUTING.md) • [Security](https://github.com/ryzenixx/livebox-api/blob/main/SECURITY.md) • [Changelog](https://github.com/ryzenixx/livebox-api/blob/main/CHANGELOG.md)