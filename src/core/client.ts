import fetch from 'node-fetch';
import { AuthManager } from './auth';

/**
 * Base client for Livebox API requests.
 */
export class BaseClient {
    private hostname: string;
    private auth: AuthManager;

    constructor(hostname: string, auth: AuthManager) {
        this.hostname = hostname;
        this.auth = auth;
    }

    /**
     * Sends an authenticated request to the Livebox API.
     */
    async request(service: string, method: string, parameters: any = {}): Promise<any> {
        if (!this.auth.isAuthenticated()) {
            await this.auth.login();
        }

        const response = await fetch(`http://${this.hostname}/ws`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-sah-ws-4-call+json',
                ...this.auth.getAuthHeaders(),
            },
            body: JSON.stringify({
                service,
                method,
                parameters,
            }),
        });

        return response.json();
    }
}