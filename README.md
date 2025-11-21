# Livebox API

[![npm version](https://badge.fury.io/js/livebox-api.svg)](https://badge.fury.io/js/livebox-api)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive TypeScript library for interacting with the Orange Livebox router API. Control your Livebox programmatically - manage devices, DHCP settings, system operations, and more.

## ✨ Features

- 🔍 **Device Discovery**: List all connected devices on your network
- 📡 **DHCP Management**: View and manage DHCP pools, static and dynamic leases
- 🔄 **System Control**: Reboot your Livebox remotely
- 🛡️ **TypeScript Support**: Full type safety with comprehensive interfaces
- 🚀 **Easy to Use**: Simple class-based API with convenience functions
- 📚 **Well Documented**: Extensive examples and API reference

## 📦 Installation

```bash
npm install livebox-api
```

## 🚀 Quick Start

### Using the LiveboxClient Class (Recommended)

```typescript
import { LiveboxClient } from 'livebox-api';

const client = new LiveboxClient('192.168.1.1', 'admin', 'your_password');

// Get connected devices
const devices = await client.getConnectedDevices();
console.log(`Found ${devices.length} devices`);

// Get DHCP settings
const dhcp = await client.getDHCPSettings();
console.log('DHCP pools:', Object.keys(dhcp.status));

// Reboot the Livebox
await client.rebootLivebox();
```

### Using Convenience Functions

```typescript
import { getConnectedDevices, getDHCPSettings } from 'livebox-api';

// Get devices (requires password parameter)
const devices = await getConnectedDevices('your_password');

// Get DHCP settings
const dhcp = await getDHCPSettings('your_password');
```

## 📖 API Reference

### LiveboxClient Class

The main interface for interacting with your Livebox.

#### Constructor

```typescript
new LiveboxClient(hostname: string, username: string, password: string)
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| hostname | string | - | Livebox IP address (usually '192.168.1.1') |
| username | string | - | Admin username (usually 'admin') |
| password | string | - | Admin password |

#### Methods

##### Device Management

###### `getConnectedDevices(): Promise<Device[]>`

Retrieves the list of all devices connected to your Livebox.

**Returns:** Array of `Device` objects

```typescript
const devices = await client.getConnectedDevices();
devices.forEach(device => {
  console.log(`${device.Name}: ${device.IPAddress} (${device.Active ? 'Active' : 'Inactive'})`);
});
```

##### DHCP Management

###### `getDHCPSettings(): Promise<DHCPSettings>`

Gets all DHCP pool configurations.

**Returns:** DHCP settings object with pool information

```typescript
const settings = await client.getDHCPSettings();
Object.entries(settings.status).forEach(([poolName, pool]) => {
  console.log(`${poolName}: ${pool.MinAddress} - ${pool.MaxAddress}`);
});
```

###### `getStaticDHCPLeases(poolName?: string): Promise<StaticDHCPLeases>`

Gets static DHCP leases for a specific pool.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| poolName | string | 'default' | DHCP pool name |

**Returns:** Static lease information

###### `getDynamicDHCPLeases(poolName?: string): Promise<DynamicDHCPLeases>`

Gets dynamic DHCP leases for a specific pool.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| poolName | string | 'default' | DHCP pool name |

**Returns:** Dynamic lease information

##### System Operations

###### `rebootLivebox(): Promise<RebootResponse>`

Remotely reboots your Livebox.

**Returns:** Reboot confirmation

```typescript
await client.rebootLivebox();
console.log('Livebox is rebooting...');
```

### Convenience Functions

Standalone functions that create their own client instances. Useful for quick operations.

#### Device Functions

##### `getConnectedDevices(password: string, hostname?: string, username?: string): Promise<Device[]>`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| password | string | - | Admin password |
| hostname | string | '192.168.1.1' | Livebox IP address |
| username | string | 'admin' | Admin username |

#### DHCP Functions

##### `getDHCPSettings(password: string, hostname?: string, username?: string): Promise<DHCPSettings>`

##### `getStaticDHCPLeases(password: string, poolName?: string, hostname?: string, username?: string): Promise<StaticDHCPLeases>`

##### `getDynamicDHCPLeases(password: string, poolName?: string, hostname?: string, username?: string): Promise<DynamicDHCPLeases>`

#### System Functions

##### `rebootLivebox(password: string, hostname?: string, username?: string): Promise<RebootResponse>`

### Type Definitions

#### Device

```typescript
interface Device {
  Key: string;
  Name: string;
  DeviceType: string;
  Active: boolean;
  IPAddress: string;
  IPv6Address?: string[];
  PhysAddress: string;
  SignalStrength: number;
  LastConnection: string;
  FirstSeen: string;
  Tags: string;
  InterfaceType: string;
  OperatingFrequencyBand: string;
  MaxDownlinkRateReached: number;
  MaxUplinkRateReached: number;
  VendorClassID: string;
}
```

#### DHCPSettings

```typescript
interface DHCPSettings {
  status: {
    [poolName: string]: DHCPPool;
  };
}

interface DHCPPool {
  Enable: boolean;
  MinAddress: string;
  MaxAddress: string;
  SubnetMask: string;
  IPRouters: string;
  DNSServers: string;
  LeaseTime: number;
  DomainName: string;
  LeaseNumberOfEntries: number;
}
```

## 📚 Examples

### Complete Device Management

```typescript
import { LiveboxClient } from 'livebox-api';

async function manageDevices() {
  const client = new LiveboxClient('192.168.1.1', 'admin', 'your_password');

  try {
    // Get all devices
    const devices = await client.getConnectedDevices();

    console.log(`📱 Found ${devices.length} connected devices:`);

    devices.forEach((device, index) => {
      const status = device.Active ? '🟢' : '🔴';
      console.log(`${index + 1}. ${status} ${device.Name} (${device.IPAddress})`);
      console.log(`   Type: ${device.DeviceType}, MAC: ${device.PhysAddress}`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

manageDevices();
```

### DHCP Pool Monitoring

```typescript
import { LiveboxClient } from 'livebox-api';

async function monitorDHCP() {
  const client = new LiveboxClient('192.168.1.1', 'admin', 'your_password');

  try {
    // Get DHCP settings
    const dhcp = await client.getDHCPSettings();

    console.log('📡 DHCP Pools:');
    Object.entries(dhcp.status).forEach(([name, pool]) => {
      console.log(`\n🏊 ${name}:`);
      console.log(`  Range: ${pool.MinAddress} - ${pool.MaxAddress}`);
      console.log(`  Status: ${pool.Enable ? 'Enabled' : 'Disabled'}`);
      console.log(`  Lease Time: ${pool.LeaseTime / 3600} hours`);
      console.log(`  Active Leases: ${pool.LeaseNumberOfEntries}`);
    });

    // Get dynamic leases
    const dynamic = await client.system.getDynamicDHCPLeases();
    const leases = Object.values(dynamic.status.default || {});

    console.log(`\n🔄 Dynamic Leases: ${leases.length}`);
    leases.slice(0, 5).forEach(lease => {
      const remaining = Math.floor(lease.LeaseTimeRemaining / 3600);
      console.log(`  ${lease.FriendlyName || 'Unknown'}: ${lease.IPAddress} (${remaining}h remaining)`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

monitorDHCP();
```

### System Reboot

```typescript
import { LiveboxClient } from 'livebox-api';

async function rebootSystem() {
  const client = new LiveboxClient('192.168.1.1', 'admin', 'your_password');

  try {
    console.log('🔄 Rebooting Livebox...');
    await client.rebootLivebox();
    console.log('✅ Reboot command sent successfully');
    console.log('⏳ Please wait 2-3 minutes for the Livebox to restart');
  } catch (error) {
    console.error('❌ Reboot failed:', error.message);
  }
}

rebootSystem();
```

## 🔧 Development

### Prerequisites

- Node.js 16+
- TypeScript 5+
- Access to an Orange Livebox router

### Building

```bash
npm run build
```

### Running Examples

```bash
# Set your password in .env
echo "LIVEBOX_PASSWORD=your_actual_password" > .env

# Run examples
npm run devices-example
npm run dhcp-example
npm run reboot-example
```

### Testing

The library includes comprehensive examples that serve as integration tests. Make sure your Livebox is accessible and you have the correct admin password.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This library is not officially affiliated with Orange or the Livebox product. Use at your own risk. Make sure you have proper authorization to access your Livebox router.

## 🆘 Troubleshooting

### Authentication Issues
- Verify your Livebox IP address (usually `192.168.1.1`)
- Check your admin password
- Ensure you're on the same network as your Livebox

### Connection Issues
- Make sure your Livebox is powered on and accessible
- Check firewall settings
- Try accessing the Livebox web interface manually first

### API Errors
- Some operations may require specific Livebox firmware versions
- Check the Livebox logs for additional error information

## 📞 Support

If you encounter issues or have questions:

1. Check the examples in the `examples/` directory
2. Review the API documentation above
3. Open an issue on GitHub

---

Made with ❤️ for the Orange Livebox community</content>
<parameter name="filePath">/Users/mael/Documents/Livebox/README.md