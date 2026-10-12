import { readdir, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const output = new URL('../dist/assets/figma/', import.meta.url).pathname;
for (const folder of ['Personas', 'Tech', 'Finanzas', 'Creatividad', 'Construccio\u0301n']) {
  await rm(join(output, folder), { recursive: true, force: true });
}

const sourceRoot = new URL('../src/', import.meta.url).pathname;
async function sourceText(directory) {
  let text = '';
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) text += await sourceText(path);
    else if (/\.(?:ts|tsx|css)$/.test(entry.name)) text += await readFile(path, 'utf8');
  }
  return text;
}

const references = await sourceText(sourceRoot);
for (const entry of await readdir(output, { withFileTypes: true })) {
  if (!entry.isFile() || !/\.(?:png|jpe?g|webp)$/i.test(entry.name)) continue;
  if (!references.includes(`/assets/figma/${entry.name}`)) await rm(join(output, entry.name));
}
