import fs, { stat } from 'fs';
import path from 'path';

// Get all paths from directory
export function walkDir(dir, fileList = []) {
    
    // Check if dir is a file
    const stats = fs.statSync(dir); // Get stats for the directory
    if (stats.isFile()) {
        fileList.push(dir); 
        return fileList; 
    } 
    
    // Check if dir is a directory
    if (!stats.isDirectory()) {
        throw new Error(`Path ${dir} is not a directory or file`);
    }

    // Read all files in directory
    const entries = fs.readdirSync(dir, {withFileTypes: true}); 
    for (const entry of entries) { // 
        const fullPath = path.join(dir, entry.name);

        if(entry.isDirectory()) {
            walkDir(fullPath, fileList);
        } else {
            fileList.push(fullPath);
        }  
    }
    return fileList;
}
