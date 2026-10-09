import { createMcpHandler, withMcpAuth } from "mcp-handler";

import {
  RMW_CONNECTOR_INSTRUCTIONS,
  registerRmwConnectorTools,
} from "@/lib/rmw-connector/tools";

import {
  isMcpSecretConfigured,
  verifyMcpBearerToken,
} from "@/lib/rmw-connector/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const mcpHandler = createMcpHandler(registerRmwConnectorTools, {
  serverInfo: {
    name: "rmw-blog-connector",
    version: "1.0.0",
  },
  instructions: RMW_CONNECTOR_INSTRUCTIONS,
});

const authenticatedHandler = withMcpAuth(
  mcpHandler,
  verifyMcpBearerToken,
  {
    required: true,
  }
);

async function handler(req: Request) {
  console.log("mcp request", req);
  if (!isMcpSecretConfigured()) {
    console.error(
      "[rmw-connector] RMW_MCP_SECRET is missing or too short (min 32 chars)"
    );
    console.error("mcp request", req);
    return Response.json(
      {
        error: "unavailable",
        message: "MCP connector is not configured",
      },
      { status: 503 }
    );
  }

  return authenticatedHandler(req);
}

export {
  handler as GET,
  handler as POST,
  handler as DELETE,
};