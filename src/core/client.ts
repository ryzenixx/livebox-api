import { fetch } from "undici";
import { AuthManager } from "./auth";

/**
 * Generic API request parameters.
 */
type ApiParameters = Record<string, unknown>;

/**
 * Generic API response structure.
 */
type ApiResponse = Record<string, unknown>;

/**
 * Base client for Livebox API requests.
 */
export class BaseClient {
  private hostname: string;
  private auth: AuthManager;

  constructor(hostname: string, auth: AuthManager) {
    this.hostname = hostname;
    this.auth = auth;
  }

  /**
   * Sends an authenticated request to the Livebox API.
   */
  async request(
    service: string,
    method: string,
    parameters: ApiParameters = {},
  ): Promise<ApiResponse> {
    if (!this.auth.isAuthenticated()) {
      await this.auth.login();
    }

    const response = await fetch(`http://${this.hostname}/ws`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-sah-ws-4-call+json",
        ...this.auth.getAuthHeaders(),
      },
      body: JSON.stringify({
        service,
        method,
        parameters,
      }),
    });

    return response.json() as Promise<ApiResponse>;
  }
}
