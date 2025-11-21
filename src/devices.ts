import { config } from 'dotenv';
import { ClientOrange } from './client';

config();

const client = new ClientOrange('192.168.1.1', 'admin', process.env.LIVEBOX_PASSWORD || 'your_password');

interface Device {
    Name?: string;
    IPAddress?: string;
    Active: boolean;
}

// Fetches the list of devices from the API
export async function getConnectedDevices(): Promise<Device[]> {
    const response = await client.getConnectedDevices();
    return parseDevices(response);
}

// Parses the weird API response to get active devices
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
                // console.log('Found method:', method); // debug
                devices.push(...children);
            }
        }
    }
    // Filter only active ones
    const activeDevices = devices.filter(device => device.Active);
    return activeDevices;
}