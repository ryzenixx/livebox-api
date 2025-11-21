import { getConnectedDevices } from '../src/index';

async function test() {
    try {
        console.log('Testing getConnectedDevices...');
        const devices = await getConnectedDevices();
        console.log('Devices found:', devices.length);
        devices.slice(0, 2).forEach((d, i) => {
            console.log(`Device ${i + 1}:`, JSON.stringify(d, null, 2));
        });
        console.log('Test passed!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();