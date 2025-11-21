import { BaseClient } from '../../core/client';
import { DHCPSettings, StaticDHCPLeases } from './types';

/**
 * Service for system-level operations like reboot and DHCP settings.
 */
export class SystemService {
    private client: BaseClient;

    constructor(client: BaseClient) {
        this.client = client;
    }

    /**
     * Reboots the Livebox.
     */
    async rebootLivebox(): Promise<any> {
        return this.client.request('NMC', 'reboot', {});
    }

    /**
     * Gets the DHCP server settings.
     */
    async getDHCPSettings(): Promise<DHCPSettings> {
        return this.client.request('DHCPv4.Server.Pool', 'get', {});
    }

    /**
     * Gets static DHCP leases for a specific pool.
     */
    async getStaticDHCPLeases(poolName: string = 'default'): Promise<StaticDHCPLeases> {
        return this.client.request(`DHCPv4.Server.Pool.${poolName}.StaticAddress`, 'get', {});
    }
}

// Convenience functions using shared client
import { sharedSystemService } from '../../shared-client';

export async function rebootLivebox(): Promise<any> {
    return sharedSystemService.rebootLivebox();
}

export async function getDHCPSettings(): Promise<DHCPSettings> {
    return sharedSystemService.getDHCPSettings();
}

export async function getStaticDHCPLeases(poolName: string = 'default'): Promise<StaticDHCPLeases> {
    return sharedSystemService.getStaticDHCPLeases(poolName);
}