import { LiveboxClient, StaticDHCPLease } from "../src/index";
import * as dotenv from "dotenv";

dotenv.config();

async function deleteStaticDHCPExample() {
  try {
    console.log("Testing deleteStaticDHCPLease...");
    const client = new LiveboxClient(
      "192.168.1.1",
      "admin",
      process.env.LIVEBOX_PASSWORD || "your_password"
    );

    // Delete a static DHCP lease
    const deleteResult = await client.deleteStaticDHCPLease({
      mac: "AA:BB:CC:DD:EE:FF",
    });
    console.log("Delete result:", deleteResult);

    // Optionally, verify by getting the leases
    const leases = await client.getStaticDHCPLeases();
    console.log("Updated Static DHCP Leases:");
    const leaseEntries = leases.status;
    if (Object.keys(leaseEntries).length === 0) {
      console.log("  No static DHCP leases found.");
    } else {
      for (const [leaseId, lease] of Object.entries(leaseEntries) as [
        string,
        StaticDHCPLease,
      ][]) {
        console.log(`\nLease ID: ${leaseId}`);
        console.log(`  MAC Address: ${lease.Chaddr}`);
        console.log(`  IP Address: ${lease.Yiaddr}`);
        console.log(`  Alias: ${lease.Alias || "N/A"}`);
        console.log(`  Enabled: ${lease.Enable}`);
      }
    }

    console.log("Test passed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

deleteStaticDHCPExample();