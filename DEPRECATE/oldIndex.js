#! /usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { walkDir } from "./lib/fs-utils.js";
import { getContext } from "./lib/context.js";

const server = new McpServer({
  name: "mcp-file-server",
  version: "1.0.0",
});

const inputSchema = {
  path: z.string().describe("The path to the file to read"),
  encoding: z.string().optional().describe("The encoding of the file content, defaults to 'utf-8'"),
};

// const outputSchema = z.array((z.object({
//     path: z.string(),
//     name: z.string(),
//     type: z.string(),
//     size: z.number(),
//     lastModified: z.string(),
//     content: z.string().nullable(),
// })));

async function getFolderInfo({path, encoding = 'utf-8'}) {
    try {
        const fileList = walkDir(path);
        console.error(JSON.stringify(fileList.map(fp => getContext(fp, encoding)), null, 2));
        return fileList.map(fp => getContext(fp, encoding));
    } catch (error) {
        throw new Error(`Error processing folder: ${error.message}`);
    }
}

server.registerTool("folderInfo", {
    title: "Folder/file Info Tool",
    description: "Get information about a file or all file(s) in a folder",
    inputSchema: inputSchema,
    // outputSchema: outputSchema
}, getFolderInfo);



const transport = new StdioServerTransport();
await server.connect(transport);