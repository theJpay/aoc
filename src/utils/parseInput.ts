
import fs from "fs/promises";

export async function parseInput(filePath: string) {
    const file = await fs.readFile(filePath, "utf8");
    return file.split("\n");
}
