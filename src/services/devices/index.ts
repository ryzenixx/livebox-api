import { BaseClient } from '../../core/client';
import { Device } from './types';

/**
 * Service for managing connected devices.
 */
export class DevicesService {
    private client: BaseClient;

    constructor(client: BaseClient) {
        this.client = client;
    }

    /**
     * Gets the list of connected devices.
     */
    async getConnectedDevices(): Promise<Device[]> {
        const response = await this.client.request('TopologyDiagnostics', 'buildTopology', { SendXmlFile: false });
        return this.parseDevices(response);
    }

    /**
     * Parses the API response to extract device information.
     */
    private parseDevices(response: any): Device[] {
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
        // Filter only active devices
        return devices.filter(device => device.Active);
    }
}

// Convenience function using shared client
import { sharedDevicesService } from '../../shared-client';

export async function getConnectedDevices(): Promise<Device[]> {
    return sharedDevicesService.getConnectedDevices();
}