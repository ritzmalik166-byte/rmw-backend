import { createHash, timingSafeEqual } from "crypto";
import type { AuthInfo } from "@modelcontextprotocol/server";

/**
 * TEMPORARY shared-secret auth for MCP testing (Authorization: Bearer <RMW_MCP_SECRET>).
 * Replace `verifyMcpBearerToken` with an OAuth access-token verifier for production.
 */

const MIN_SECRET_LENGTH = 32;

function getMcpSecret(): string | null {
  const secret = process.env.RMW_MCP_SECRET?.trim();
  if (!secret || secret.length < MIN_SECRET_LENGTH || secret.startsWith("<")) {
    return null;
  }
  return secret;
}

export function isMcpSecretConfigured(): boolean {
  return getMcpSecret() !== null;
}

function secretsMatch(provided: string, expected: string): boolean {
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function getBearerToken(req: Request): string | undefined {
  const [type, token] = req.headers.get("Authorization")?.split(" ") || [];
  return type?.toLowerCase() === "bearer" && token ? token : undefined;
}

export function verifyMcpBearerToken(
  _req: Request,
  bearerToken?: string
): AuthInfo | undefined {
  const secret = getMcpSecret();
  if (!secret || !bearerToken || !secretsMatch(bearerToken, secret)) {
    console.error("MCP secret does not match", secret, bearerToken);
    return undefined;
  }

  console.log("MCP secret matches", secret, bearerToken);

  return {
    token: bearerToken,
    clientId: "rmw-mcp-shared-secret",
    scopes: ["rmw:blogs:read", "rmw:blogs:draft"],
  };
}
