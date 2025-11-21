/**
 * Interface for a connected device.
 */
export interface Device {
  Key: string;
  Name?: string;
  DeviceType?: string;
  Active: boolean;
  IPAddress?: string;
  IPv6Address?: string[];
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
