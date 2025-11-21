import { getConnectedDevices } from '../src/index';

async function test() {
    try {
        console.log('Testing getConnectedDevices...');
        const devices = await getConnectedDevices();
        console.log('Devices found:', devices.length);
        devices.slice(0, 5).forEach((d: any) => console.log(`${d.Name}: ${d.IPAddress}`));
        console.log('Test passed!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();