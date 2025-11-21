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