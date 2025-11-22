/**
 * Interface for a DHCP pool configuration.
 */
export interface DHCPPool {
  Enable: boolean;
  Authoritative: boolean;
  Name: string;
  Status: string;
  Allocation: string;
  PersistentLeases: boolean;
  LeasesOnHold: boolean;
  ARPProtect: boolean;
  Interface: string;
  DSCPMark: number;
  MinAddress: string;
  MaxAddress: string;
  SubnetMask: string;
  IPRouters: string;
  Server: string;
  MinLeaseTime: number;
  LeaseTime: number;
  MaxLeaseTime: number;
  DNSServers: string;
  NTPServers: string;
  DomainName: string;
  Unnumbered: boolean;
  IncludeOption125: boolean;
  Flags: number;
  ServerHostName: string;
  FileName: string;
  LeaseNumberOfEntries: number;
  OptionNumberOfEntries: number;
  RuleNumberOfEntries: number;
  StaticAddressNumberOfEntries: number;
}
/**
 * Interface for DHCP settings response.
 */
export interface DHCPSettings {
  status: Record<string, DHCPPool>;
}
/**
 * Interface for a static DHCP lease.
 */
export interface StaticDHCPLease {
  Enable: boolean;
  Alias: string;
  Chaddr: string; // MAC Address
  Yiaddr: string; // IP Address
}
/**
 * Interface for adding a static DHCP lease.
 */
export interface AddStaticDHCPLeaseInput {
  mac: string;
  ip: string;
  alias?: string;
  enable?: boolean;
}
/**
 * Interface for deleting a static DHCP lease.
 */
export interface DeleteStaticDHCPLeaseInput {
  mac: string;
}
/**
 * Interface for static DHCP leases response.
 */
export interface StaticDHCPLeases {
  status: Record<string, StaticDHCPLease>;
}
/**
 * Interface for a dynamic DHCP lease.
 */
export interface DynamicDHCPLease {
  ClientID: string;
  IPAddress: string;
  MACAddress: string;
  LeaseTimeRemaining: number;
  LeaseTime: number;
  Gateway: string;
  WaitingForPing: boolean;
  StoppedWaitingForPing: boolean;
  Active: boolean;
  StopLease: boolean;
  NullTermination: boolean;
  MsftClasslessRt: boolean;
  Reserved: boolean;
  Internal: boolean;
  OnHold: boolean;
  FriendlyName: string;
  Flags: number;
  TransactionID: number;
  CIAddr: string;
  GIAddr: string;
  DiscoverOptionList: string;
  RequestOptionList: string;
  OptionNumberOfEntries: number;
}
/**
 * Interface for dynamic DHCP leases response.
 */
export interface DynamicDHCPLeases {
  status: Record<string, Record<string, DynamicDHCPLease>>;
}

/**
 * Reboot response structure.
 */
export interface RebootResponse {
  status?: boolean;
}
