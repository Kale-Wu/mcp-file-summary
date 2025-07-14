#! /usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import si from 'systeminformation';

const server = new McpServer({
  name: "mcp-si-server",
  version: "1.0.0",
});

const inputSchema = {
  request: z.string().describe("The system hardware you want to identify. This can be 'cpu', 'memory', 'disk', 'network', 'os', or 'all'.")
};

async function getHardwareInfo({ request = 'all' }) {
  console.error("Dummy function called with request:", request);

  const cpu = await si.cpu();
  const memory = await si.mem(); 
  const disk = await si.fsSize();
  const network = await si.networkInterfaces();
  const os = await si.osInfo();
  const parts = [];

  if (request === 'cpu' || request === 'all') {
    parts.push(`CPU:\n${JSON.stringify(cpu, null, 2)}`);
  }
  if (request === 'memory' || request === 'all') {
    parts.push(`Memory:\n${JSON.stringify(memory, null, 2)}`);
  }
  if (request === 'disk' || request === 'all') {
    parts.push(`Disk:\n${JSON.stringify(disk, null, 2)}`);
  }
  if (request === 'network' || request === 'all') {
    parts.push(`Network:\n${JSON.stringify(network, null, 2)}`);
  }
  if (request === 'os' || request === 'all') {
    parts.push(`OS:\n${JSON.stringify(os, null, 2)}`);
  }

  const responseText = parts.join('\n\n');

  return {
    cpu: cpu || null,
    memory: memory || null,
    disk: disk || null,
    network: network || null,
    os: os || null,
    content: [
      {
        type: "text",   
        text: responseText
      }
    ]
  };
}

server.registerTool("hardwareInfo", {
    title: "Hardware Info Tool",
    description: "Get information about the system hardware that's running this server",
    inputSchema: inputSchema,
}, getHardwareInfo);


const transport = new StdioServerTransport();
await server.connect(transport);