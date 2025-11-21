import { BaseClient } from "../../core/client";
import { AuthManager } from "../../core/auth";
import { DHCPSettings, StaticDHCPLeases, DynamicDHCPLeases } from "./types";

/**
 * Reboot response structure.
 */
export interface RebootResponse {
  status?: boolean;
}

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
  async rebootLivebox(): Promise<RebootResponse> {
    return this.client.request("NMC", "reboot", {}) as unknown as Promise<RebootResponse>;
  }

  /**
   * Gets the DHCP server settings.
   */
  async getDHCPSettings(): Promise<DHCPSettings> {
    return this.client.request("DHCPv4.Server.Pool", "get", {}) as unknown as Promise<DHCPSettings>;
  }

  /**
   * Gets static DHCP leases for a specific pool.
   */
  async getStaticDHCPLeases(
    poolName: string = "default",
  ): Promise<StaticDHCPLeases> {
    return this.client.request(
      `DHCPv4.Server.Pool.${poolName}.StaticAddress`,
      "get",
      {},
    ) as unknown as Promise<StaticDHCPLeases>;
  }

  /**
   * Gets dynamic DHCP leases for a specific pool.
   */
  async getDynamicDHCPLeases(
    poolName: string = "default",
  ): Promise<DynamicDHCPLeases> {
    return this.client.request(
      `DHCPv4.Server.Pool.${poolName}`,
      "getLeases",
      {},
    ) as unknown as Promise<DynamicDHCPLeases>;
  }
}

// Convenience functions with credentials as parameters
export async function rebootLivebox(
  password: string,
  hostname: string = "192.168.1.1",
  username: string = "admin",
): Promise<RebootResponse> {
  const auth = new AuthManager(hostname, username, password);
  const baseClient = new BaseClient(hostname, auth);
  const service = new SystemService(baseClient);

  return service.rebootLivebox();
}

export async function getDHCPSettings(
  password: string,
  hostname: string = "192.168.1.1",
  username: string = "admin",
): Promise<DHCPSettings> {
  const auth = new AuthManager(hostname, username, password);
  const baseClient = new BaseClient(hostname, auth);
  const service = new SystemService(baseClient);

  return service.getDHCPSettings();
}

export async function getStaticDHCPLeases(
  password: string,
  poolName: string = "default",
  hostname: string = "192.168.1.1",
  username: string = "admin",
): Promise<StaticDHCPLeases> {
  const auth = new AuthManager(hostname, username, password);
  const baseClient = new BaseClient(hostname, auth);
  const service = new SystemService(baseClient);

  return service.getStaticDHCPLeases(poolName);
}

export async function getDynamicDHCPLeases(
  password: string,
  poolName: string = "default",
  hostname: string = "192.168.1.1",
  username: string = "admin",
): Promise<DynamicDHCPLeases> {
  const auth = new AuthManager(hostname, username, password);
  const baseClient = new BaseClient(hostname, auth);
  const service = new SystemService(baseClient);

  return service.getDynamicDHCPLeases(poolName);
}
