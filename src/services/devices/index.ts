import { BaseClient } from "../../core/client";
import { AuthManager } from "../../core/auth";
import { Device } from "./types";

/**
 * IPv6 address structure from API.
 */
interface IPv6Address {
  Address: string;
}

/**
 * Child structure from topology response.
 */
interface TopologyChild {
  Key: string;
  Name?: string;
  Children?: TopologyChild[];
  DeviceType?: string;
  Active?: boolean;
  IPAddress?: string;
  IPv6Address?: IPv6Address[];
  PhysAddress?: string;
  SignalStrength?: number;
  LastConnection?: string;
  FirstSeen?: string;
  Tags?: string;
  InterfaceType?: string;
  OperatingFrequencyBand?: string;
  MaxDownlinkRateReached?: number;
  MaxUplinkRateReached?: number;
  VendorClassID?: string;
}

/**
 * Topology diagnostics response structure.
 */
interface TopologyResponse {
  status?: TopologyChild[];
}

/**
 * Service for managing connected devices.
 */
export class DevicesService {
  private client: BaseClient;

  constructor(client: BaseClient) {
    this.client = client;
  }

  /**
   * Gets the list of connected devices.
   */
  async getConnectedDevices(): Promise<Device[]> {
    const response = await this.client.request(
      "TopologyDiagnostics",
      "buildTopology",
      { SendXmlFile: false },
    );
    return this.parseDevices(response as TopologyResponse);
  }

  /**
   * Parses the API response to extract device information.
   */
  private parseDevices(response: TopologyResponse): Device[] {
    const devices: Device[] = [];

    if (response.status && response.status.length > 0) {
      const toporoot = response.status[0];
      const childTypes = toporoot.Children || [];
      const lan = childTypes.find((x: TopologyChild) => x.Key === "lan");

      if (lan) {
        const methods = lan.Children || [];

        for (const method of methods) {
          const children = method.Children || [];
          devices.push(
            ...children.map((child: TopologyChild) => ({
              Key: child.Key || "",
              Name: child.Name || "",
              DeviceType: child.DeviceType || "",
              Active: child.Active || false,
              IPAddress: child.IPAddress || "",
              IPv6Address: child.IPv6Address?.map((ip: IPv6Address) => ip.Address),
              PhysAddress: child.PhysAddress || "",
              SignalStrength: child.SignalStrength || 0,
              LastConnection: child.LastConnection || "",
              FirstSeen: child.FirstSeen || "",
              Tags: child.Tags || "",
              InterfaceType: child.InterfaceType || "",
              OperatingFrequencyBand: child.OperatingFrequencyBand || "",
              MaxDownlinkRateReached: child.MaxDownlinkRateReached || 0,
              MaxUplinkRateReached: child.MaxUplinkRateReached || 0,
              VendorClassID: child.VendorClassID || "",
            })),
          );
        }
      }
    }

    // Filter only active devices
    return devices.filter((device) => device.Active);
  }
}

// Convenience function with credentials as parameters
export async function getConnectedDevices(
  password: string,
  hostname: string = "192.168.1.1",
  username: string = "admin",
): Promise<Device[]> {
  const auth = new AuthManager(hostname, username, password);
  const baseClient = new BaseClient(hostname, auth);
  const service = new DevicesService(baseClient);

  return service.getConnectedDevices();
}
