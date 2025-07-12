// DEPRECATED FOR AI SUMMARY GENERATION
// This file is no longer used in the current implementation.
// It was previously used to define schemas for file context and actions when AI summary generation within the tool was planned.
// The current implementation uses the `getContext` function and relies on the user AI to generate summaries.

// import { z } from "zod";

// export const fileContextSchema = z.object({
//     path: z.string(),
//     name: z.string(),
//     type: z.string(),
//     size: z.number(),
//     lastModified: z.string(),
//     content: z.string().nullable(),
// });

// export const fileActionSchema = z.object({
//   summary: z
//     .string()
//     .describe("A concise 2-3 sentence summary of the file's contents based on its name and content."),
//   action: z
//     .string()
//     .describe("A recommended action to take with the file, such as 'Move to Pictures', 'Delete', or 'No action needed'."),
// });

