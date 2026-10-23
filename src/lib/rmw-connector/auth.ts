import { createHash, timingSafeEqual } from "crypto";
import type { AuthInfo } from "@modelcontextprotocol/server";



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
  req: Request,
  bearerToken?: string
): AuthInfo | undefined {
  const secret = getMcpSecret();

  const authorization = req.headers.get("Authorization");
  const headerToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]
    ?? authorization;

  const token = bearerToken ?? headerToken?.trim();

  if (!secret || !token || !secretsMatch(token, secret)) {
    console.error("[rmw-connector] MCP authentication failed");
    return undefined;
  }

  return {
    token,
    clientId: "rmw-mcp-shared-secret",
    scopes: ["rmw:blogs:read", "rmw:blogs:draft"],
  };
}