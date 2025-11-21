import { LiveboxClient, StaticDHCPLease } from "../src/index";
import * as dotenv from "dotenv";

dotenv.config();

async function staticDHCPExample() {
  try {
    console.log("Testing getStaticDHCPLeases...");
    const client = new LiveboxClient(
      "192.168.1.1",
      "admin",
      process.env.LIVEBOX_PASSWORD || "your_password"
    );
    const leases = await client.system.getStaticDHCPLeases();
    console.log("Static DHCP Leases:");
    // Display info for each static lease
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
staticDHCPExample();
