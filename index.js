#! /usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { walkDir } from "./lib/fs-utils.js";
import { getContext } from "./lib/context.js";


// const server = new McpServer({
//     name: "mcp-file-summary",
//     vesion: "1.0.0"
// });


const folderPath = process.argv[2] || "C:\\Users\\kalew\\Documents\\GitHub\\mcp-file-summary\\TEST_FILE.txt"; // Get the folder path from command line arguments or default to current directory
const fileList = walkDir(folderPath); // Get all files in the directory

console.log(`Found ${fileList.length} files in directory: ${folderPath}`);
console.log(getContext( "C:\\Users\\kalew\\Documents\\GitHub\\mcp-file-summary\\TEST_FILE.txt")); // Get context for the first file
