import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, basename, extname } from 'path';

const ASSETS_DIR = new URL('../src/assets', import.meta.url).pathname;
const QUALITY = 85;

const files = await readdir(ASSETS_DIR);
const pngs = files.filter(f => extname(f).toLowerCase() === '.png');

console.log(`Converting ${pngs.length} PNG files to WebP (quality ${QUALITY})...`);

let saved = 0;
for (const file of pngs) {
  const input = join(ASSETS_DIR, file);
  const output = join(ASSETS_DIR, basename(file, '.png') + '.webp');
  const { size: before } = await import('fs').then(fs => fs.promises.stat(input));
  await sharp(input).webp({ quality: QUALITY }).toFile(output);
  const { size: after } = await import('fs').then(fs => fs.promises.stat(output));
  saved += before - after;
  console.log(`  ${file} → ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB`);
}

console.log(`\nDone! Total saved: ${(saved / 1024 / 1024).toFixed(1)} MB`);
