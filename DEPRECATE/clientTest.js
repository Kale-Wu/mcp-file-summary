import { McpClient } from "@modelcontextprotocol/sdk/client/stdio.js";

async function callHardwareTool(request = "all") {
  const client = new McpClient();

  // Connect client to your already running MCP server process over stdio
  await client.connect(process.stdin, process.stdout);

  // Call your registered tool on the server
  const result = await client.callTool("hardwareInfo", { request });

  return result;
}

// Example usage
callHardwareTool().then(console.log).catch(console.error);