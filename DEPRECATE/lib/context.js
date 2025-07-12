import fs from 'fs';
import { type } from 'os';
import path from 'path';

export function getContext(filePath, encoding = 'utf-8') {
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).slice(1).toLowerCase(); // Get file extension and convert to lowercase
    const baseName = path.basename(filePath);

    let content = null;

    // Attempt to read text
    try {
        const raw = fs.readFileSync(filePath, encoding);
        content = raw.slice(0, 512); // Limit content to first 1000 characters
    } catch {
        content = null; // If reading fails, set content to null
    }

    return {
        path: filePath,
        name: baseName,
        type: ext,
        size: stats.size,
        lastModified: stats.mtime.getDate() + '/' + (stats.mtime.getMonth() + 1) + '/' + stats.mtime.getFullYear() + '(DD/MM/YYYY)',
        content: content,
    }

}