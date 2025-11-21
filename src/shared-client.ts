import { config } from "dotenv";
import { AuthManager } from "./core/auth";
import { BaseClient } from "./core/client";
import { DevicesService } from "./services/devices/index";
import { SystemService } from "./services/system/index";

config();

const hostname = "192.168.1.1";
const username = "admin";
const password = process.env.LIVEBOX_PASSWORD2 || "your_password";

/**
 * Shared auth and client instances for convenience functions.
 */
const auth = new AuthManager(hostname, username, password);
const baseClient = new BaseClient(hostname, auth);

/**
 * Shared service instances.
 */
export const sharedDevicesService = new DevicesService(baseClient);
export const sharedSystemService = new SystemService(baseClient);