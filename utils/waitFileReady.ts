import fs from 'fs/promises';
import { existsSync } from 'fs';

/**
 * Waits for a file to become available, checking every second up to 10 times
 * @param filePath - The path to the file to check
 * @returns Promise that resolves when the file is ready
 * @throws Error if the file doesn't exist after all retries
 */
export async function waitFileReady(filePath: string): Promise<void> {
    const maxRetries = 10;
    const retryDelay = 1000; // 1 second
    console.log("Waiting for file to be ready: ", filePath);
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        if (existsSync(filePath)) {
            return;
        }

        if (attempt === maxRetries - 1) {
            throw new Error(`File ${filePath} not found after ${maxRetries} attempts`);
        }

        await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
}
