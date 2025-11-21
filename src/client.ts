import { AuthManager } from './core/auth';
import { BaseClient } from './core/client';
import { DevicesService } from './services/devices/index';
import { SystemService } from './services/system/index';

/**
 * Main client for Orange Livebox API.
 * Provides access to all services.
 */
export class LiveboxClient {
    private baseClient: BaseClient;
    public devices: DevicesService;
    public system: SystemService;

    constructor(hostname: string, username: string, password: string) {
        const auth = new AuthManager(hostname, username, password);
        this.baseClient = new BaseClient(hostname, auth);
        this.devices = new DevicesService(this.baseClient);
        this.system = new SystemService(this.baseClient);
    }

    /**
     * Convenience method to get connected devices.
     */
    async getConnectedDevices() {
        return this.devices.getConnectedDevices();
    }

    /**
     * Convenience method to reboot the Livebox.
     */
    async rebootLivebox() {
        return this.system.rebootLivebox();
    }

    /**
     * Convenience method to get DHCP settings.
     */
    async getDHCPSettings() {
        return this.system.getDHCPSettings();
    }
}