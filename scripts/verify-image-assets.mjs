import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const sourceRoot = join(root, 'src');
const manifest = JSON.parse(await readFile(join(sourceRoot, 'data/optimizedImages.json'), 'utf8'));
const referenced = new Set();

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await scan(path);
    else if (/\.(?:ts|tsx|css)$/.test(entry.name)) {
      const text = await readFile(path, 'utf8');
      for (const match of text.matchAll(/\/assets\/figma\/[^'"]+?\.(?:jpe?g|png)/g)) {
        const asset = match[0].replaceAll('\\u0301', '\u0301');
        if (/^\/assets\/figma\/(?:Personas|Tech|Finanzas|Creatividad|Construccio\u0301n|home-hero-(?:portrait|construction|developer)\.png)/.test(asset)) {
          referenced.add(asset);
        }
      }
    }
  }
}

await scan(sourceRoot);
for (const asset of referenced) {
  if (!manifest[asset]) throw new Error(`Missing optimized image entry: ${asset}. Run npm run images:build.`);
}
for (const image of Object.values(manifest)) {
  for (const path of [...image.webp.map((variant) => variant.src), image.fallback]) {
    await access(join(root, 'public', path.slice(1)));
  }
}
