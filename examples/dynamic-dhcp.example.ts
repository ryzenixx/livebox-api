import { getDynamicDHCPLeases, DynamicDHCPLease } from "../src/index";

async function dynamicDHCPExample() {
  try {
    console.log("Testing getDynamicDHCPLeases...");
    const leases = await getDynamicDHCPLeases();
    console.log("Dynamic DHCP Leases:");

    // Display info for each dynamic lease
    const poolLeases = leases.status.default || {};
    if (Object.keys(poolLeases).length === 0) {
      console.log("  No dynamic DHCP leases found.");
    } else {
      for (const [clientId, lease] of Object.entries(poolLeases) as [
        string,
        DynamicDHCPLease,
      ][]) {
        console.log(`\nClient ID: ${clientId}`);
        console.log(`  MAC Address: ${lease.MACAddress}`);
        console.log(`  IP Address: ${lease.IPAddress}`);
        if (lease.FriendlyName) {
          console.log(`  Device Name: ${lease.FriendlyName}`);
        }
        if (lease.LeaseTimeRemaining !== undefined) {
          const remainingHours = Math.floor(lease.LeaseTimeRemaining / 3600);
          const remainingMinutes = Math.floor(
            (lease.LeaseTimeRemaining % 3600) / 60,
          );
          console.log(
            `  Lease Time Remaining: ${remainingHours}h ${remainingMinutes}m`,
          );
        }
        console.log(`  Active: ${lease.Active}`);
      }
    }
    console.log("Test passed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

dynamicDHCPExample();
