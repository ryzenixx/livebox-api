import { LiveboxClient, Device } from "../src/index";
import * as dotenv from "dotenv";

dotenv.config();

async function devicesExample() {
  try {
    console.log("Testing getConnectedDevices...");
    const client = new LiveboxClient(
      "192.168.1.1",
      "admin",
      process.env.LIVEBOX_PASSWORD || "your_password"
    );
    const devices: Device[] = await client.getConnectedDevices();
    console.log("Devices found:", devices.length);
    devices.slice(0, 3).forEach((d, i) => {
      console.log(`Device ${i + 1}:`, d);
    });
    console.log("Test passed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}
devicesExample();
