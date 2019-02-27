import * as fs from 'fs';

export async function load(filePath: string) {
  let content = await fs.readFile(filePath);
}
