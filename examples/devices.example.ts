import { getConnectedDevices, Device } from '../src/index';

async function test() {
    try {
        console.log('Testing getConnectedDevices...');
        const devices: Device[] = await getConnectedDevices();
        console.log('Devices found:', devices.length);
        devices.slice(0, 3).forEach((d, i) => {
            console.log(`Device ${i + 1}:`, d);
        });
        console.log('Test passed!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();