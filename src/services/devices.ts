import { getAuthenticatedClient } from '../shared-client';
import { Device } from '../types';

// Fetches the list of devices from the API
export async function getConnectedDevices(): Promise<Device[]> {
    const client = await getAuthenticatedClient();
    const response = await client.getConnectedDevices();
    return parseDevices(response);
}

// Parses the API response to get active devices with selected info
function parseDevices(response: any): Device[] {
    const devices: Device[] = [];
    if (response.status && response.status.length > 0) {
        const toporoot = response.status[0];
        const childTypes = toporoot.Children || [];
        const lan = childTypes.find((x: any) => x.Key === 'lan');
        if (lan) {
            const methods = lan.Children || [];
            for (const method of methods) {
                const children = method.Children || [];
                devices.push(...children.map((child: any) => ({
                    Key: child.Key,
                    Name: child.Name,
                    DeviceType: child.DeviceType,
                    Active: child.Active,
                    IPAddress: child.IPAddress,
                    IPv6Address: child.IPv6Address?.map((ip: any) => ip.Address),
                    PhysAddress: child.PhysAddress,
                    SignalStrength: child.SignalStrength,
                    LastConnection: child.LastConnection,
                    FirstSeen: child.FirstSeen,
                    Tags: child.Tags,
                    InterfaceType: child.InterfaceType,
                    OperatingFrequencyBand: child.OperatingFrequencyBand,
                    MaxDownlinkRateReached: child.MaxDownlinkRateReached,
                    MaxUplinkRateReached: child.MaxUplinkRateReached,
                    VendorClassID: child.VendorClassID,
                })));
            }
        }
    }
    // Filter only active ones
    const activeDevices = devices.filter(device => device.Active);
    return activeDevices;
}