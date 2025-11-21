import { getAuthenticatedClient } from '../shared-client';
import { DHCPSettings } from '../types';

/**
 * Reboots the Livebox (convenience function with internal client).
 */
export async function rebootLivebox(): Promise<any> {
    const client = await getAuthenticatedClient();
    return client.requestAuthenticated({
        service: 'NMC',
        method: 'reboot',
        parameters: {},
    });
}

/**
 * Gets the DHCP server settings.
 */
export async function getDHCPSettings(): Promise<DHCPSettings> {
    const client = await getAuthenticatedClient();
    return client.requestAuthenticated({
        service: 'DHCPv4.Server.Pool',
        method: 'get',
        parameters: {},
    });
}