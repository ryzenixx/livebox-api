import fetch from 'node-fetch';

/**
 * Handles authentication for Livebox API.
 */
export class AuthManager {
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

    /**
     * Logs in and establishes session.
     */
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
            throw new Error('Login failed - check your credentials');
        }

        this.contextID = json.data.contextID;
        this.cookie = cookieHeader.split(';')[0];
    }

    /**
     * Gets auth headers for requests.
     */
    getAuthHeaders(): { Authorization: string; Cookie: string } {
        if (!this.contextID || !this.cookie) {
            throw new Error('Not authenticated - call login() first');
        }
        return {
            Authorization: `X-Sah ${this.contextID}`,
            Cookie: this.cookie,
        };
    }

    /**
     * Checks if authenticated.
     */
    isAuthenticated(): boolean {
        return !!this.contextID && !!this.cookie;
    }
}