import { BaseClient } from "../../core/client";
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

// Convenience functions using shared client
import { sharedSystemService } from "../../shared-client";

export async function rebootLivebox(): Promise<RebootResponse> {
  return sharedSystemService.rebootLivebox();
}

export async function getDHCPSettings(): Promise<DHCPSettings> {
  return sharedSystemService.getDHCPSettings();
}

export async function getStaticDHCPLeases(
  poolName: string = "default",
): Promise<StaticDHCPLeases> {
  return sharedSystemService.getStaticDHCPLeases(poolName);
}

export async function getDynamicDHCPLeases(
  poolName: string = "default",
): Promise<DynamicDHCPLeases> {
  return sharedSystemService.getDynamicDHCPLeases(poolName);
}
