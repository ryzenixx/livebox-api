import { LiveboxClient } from "../src/index";
import * as dotenv from "dotenv";

dotenv.config();

async function rebootExample() {
  try {
    console.log("Testing rebootLivebox...");
    const client = new LiveboxClient(
      "192.168.1.1",
      "admin",
      process.env.LIVEBOX_PASSWORD || "your_password"
    );
    const result = await client.rebootLivebox();
    console.log("Reboot initiated:", result);
    console.log("Test passed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}
rebootExample();
