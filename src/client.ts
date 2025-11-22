import { AuthManager } from "./core/auth";
import { BaseClient } from "./core/client";
import { DevicesService } from "./services/devices/index";
import { SystemService, RebootResponse } from "./services/system/index";
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
  async rebootLivebox(): Promise<RebootResponse> {
    return this.system.rebootLivebox();
  }
  /**
   * Convenience method to get DHCP settings.
   */
  async getDHCPSettings() {
    return this.system.getDHCPSettings();
  }
  /**
   * Convenience method to get static DHCP leases.
   */
  async getStaticDHCPLeases(poolName?: string) {
    return this.system.getStaticDHCPLeases(poolName);
  }
  /**
   * Convenience method to get dynamic DHCP leases.
   */
  async getDynamicDHCPLeases(poolName?: string) {
    return this.system.getDynamicDHCPLeases(poolName);
  }

  /**
   * Convenience method to add a static DHCP lease.
   */
  async addStaticDHCPLease(lease: import("./services/system/types").AddStaticDHCPLeaseInput) {
    return this.system.addStaticDHCPLease(lease);
  }

  /**
   * Convenience method to delete a static DHCP lease.
   */
  async deleteStaticDHCPLease(lease: import("./services/system/types").DeleteStaticDHCPLeaseInput) {
    return this.system.deleteStaticDHCPLease(lease);
  }
}
