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

async function getHardwareInfo({ request = 'all'}) {
    try {
        const cpu = await si.cpu();
        const memory = await si.mem();
        const disk = await si.fsSize();
        const network = await si.networkInterfaces();
        const os = await si.osInfo();

        return {
            cpu: request === 'cpu' || request === 'all' ? cpu : null,
            memory: request === 'memory' || request === 'all' ? memory : null,
            disk: request === 'disk' || request === 'all' ? disk : null,
            network: request === 'network' || request === 'all' ? network : null,
            os: request === 'os' || request === 'all' ? os : null,
        }
        
    } catch (error) {
        throw new Error(`Error getting system information: ${error.message}`);
    }
}

server.registerTool("hardwareInfo", {
    title: "Hardware Info Tool",
    description: "Get information about the system hardware that's running this server",
    inputSchema: inputSchema,
}, getHardwareInfo);


const transport = new StdioServerTransport();
await server.connect(transport);