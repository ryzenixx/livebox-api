import { config } from 'dotenv';
import { ClientOrange } from './client';

config();

/**
 * Shared client instance for convenience functions.
 */
const sharedClient = new ClientOrange('192.168.1.1', 'admin', process.env.LIVEBOX_PASSWORD2 || 'your_password');

/**
 * Gets the shared authenticated client.
 */
export async function getAuthenticatedClient(): Promise<ClientOrange> {
    // The client handles login internally in requestAuthenticated
    return sharedClient;
}