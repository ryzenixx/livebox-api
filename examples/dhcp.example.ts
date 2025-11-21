import { getDHCPSettings, DHCPPool } from '../src/index';

async function dhcpExample() {
    try {
        console.log('Testing getDHCPSettings...');
        const settings = await getDHCPSettings();
        console.log('DHCP Settings:');
        
        // Display key info for each pool
        const pools = settings.status;
        for (const [poolName, pool] of Object.entries(pools) as [string, DHCPPool][]) {
            console.log(`\nPool: ${poolName}`);
            console.log(`  Enabled: ${pool.Enable}`);
            console.log(`  IP Range: ${pool.MinAddress} - ${pool.MaxAddress}`);
            console.log(`  Subnet Mask: ${pool.SubnetMask}`);
            console.log(`  Gateway: ${pool.IPRouters}`);
            console.log(`  DNS Servers: ${pool.DNSServers}`);
            console.log(`  Lease Time: ${pool.LeaseTime} seconds (${Math.floor(pool.LeaseTime / 3600)} hours)`);
            console.log(`  Domain: ${pool.DomainName}`);
            console.log(`  Active Leases: ${pool.LeaseNumberOfEntries}`);
        }
        console.log('Test passed!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

dhcpExample();