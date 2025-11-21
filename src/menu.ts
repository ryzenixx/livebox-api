import inquirer from 'inquirer';
import { getConnectedDevices } from './devices';

interface Device {
    Name?: string;
    IPAddress?: string;
    Active: boolean;
}

// Shows the connected devices in a nice list
async function showConnectedDevices() {
    try {
        const devices: Device[] = await getConnectedDevices();
        console.log('\nConnected devices:');
        devices.forEach((device) => {
            console.log(`${device.Name || 'Unknown'}: ${device.IPAddress || 'N/A'}`);
        });
    } catch (error) {
        console.error('Error retrieving devices:', error);
    }
}

// Main menu loop
export async function startMenu() {
    let running = true;
    while (running) {
        const { choice } = await inquirer.prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'Choose an option:',
                choices: [
                    { name: 'Connected devices', value: 'devices' },
                    { name: 'Quit', value: 'quit' },
                ],
            },
        ]);

        if (choice === 'quit') {
            running = false;
            console.log('Goodbye!');
        } else if (choice === 'devices') {
            await showConnectedDevices();
        }
    }
}