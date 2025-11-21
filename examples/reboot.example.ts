import { rebootLivebox } from "../src/index";
async function rebootExample() {
  try {
    console.log("Testing rebootLivebox...");
    const result = await rebootLivebox();
    console.log("Reboot initiated:", result);
    console.log("Test passed!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}
rebootExample();
