import fetch from 'node-fetch';

/**
 * Client for Orange Livebox API.
 * Handles authentication and requests.
 */
export class ClientOrange {
    private hostname: string;
    private username: string;
    private password: string;
    private contextID?: string;
    private cookie?: string;

    constructor(hostname: string, username: string, password: string) {
        this.hostname = hostname;
        this.username = username;
        this.password = password;
    }

    // Logs in and gets the session stuff
    async login(): Promise<void> {
        const response = await fetch(`http://${this.hostname}/ws`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-sah-ws-4-call+json',
                'Authorization': 'X-Sah-Login',
            },
            body: JSON.stringify({
                service: 'sah.Device.Information',
                method: 'createContext',
                parameters: {
                    applicationName: 'webui',
                    username: this.username,
                    password: this.password,
                },
            }),
        });

        const json = await response.json() as any;
        const cookieHeader = response.headers.get('set-cookie');
        if (!json.data?.contextID || !cookieHeader) {
            throw new Error('Login failed - check your creds');
        }

        this.contextID = json.data.contextID;
        this.cookie = cookieHeader.split(';')[0];
    }

    // Sends authenticated requests, auto-logs in if needed
    async requestAuthenticated(body: any): Promise<any> {
        if (!this.contextID || !this.cookie) {
            await this.login();
        }

        const response = await fetch(`http://${this.hostname}/ws`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-sah-ws-4-call+json',
                'Authorization': `X-Sah ${this.contextID}`,
                'Cookie': this.cookie!,
            },
            body: JSON.stringify(body),
        });

        return response.json();
    }

    // Gets device topology
    async getConnectedDevices(): Promise<any> {
        return this.requestAuthenticated({
            service: 'TopologyDiagnostics',
            method: 'buildTopology',
            parameters: { SendXmlFile: false },
        });
    }
}