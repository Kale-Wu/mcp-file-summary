#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { walkDir } from "../lib/fs-utils.js";
import { getContext } from "../lib/context.js";

const server = new McpServer({
  name: "mcp-fileInfo-server",
  version: "1.0.0"
});

const inputSchema = {
  path: z.string().describe("A path of a file or folder to get information about"),
  encoding: z.string().optional().describe("The encoding of the message, defaults to 'utf-8'"),
};

async function getFileInfo({path, encoding = 'utf-8'}) {
    try {
        const fileList = walkDir(path);
        return fileList.map(fp => getContext(fp, encoding));
    } catch (error) {
        throw new Error(`Error processing folder: ${error.message}`);
    }
}


server.registerTool("fileInfo", {
  title: "File/Folder Info Tool",
  description: "Gets information about a file/folder",
  inputSchema,
}, getFileInfo);

const transport = new StdioServerTransport();
await server.connect(transport);
