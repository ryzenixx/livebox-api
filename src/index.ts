// Export the main client and services
export { LiveboxClient } from './client';
export { DevicesService } from './services/devices/index';
export { SystemService } from './services/system/index';

// Export convenience functions (backward compatibility)
export { getConnectedDevices } from './services/devices/index';
export { rebootLivebox, getDHCPSettings, getStaticDHCPLeases } from './services/system/index';

// Export types
export { Device } from './services/devices/types';
export { DHCPPool, DHCPSettings, StaticDHCPLease, StaticDHCPLeases } from './services/system/types';

// Legacy export
export { LiveboxClient as ClientOrange } from './client';