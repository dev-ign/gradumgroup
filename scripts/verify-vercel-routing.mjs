import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const features = JSON.parse(readFileSync(new URL('../src/data/siteFeatures.json', import.meta.url)));
const vercelConfig = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));

assert.deepEqual(vercelConfig.redirects, [
  { source: '/construction/build', destination: '/construction/execution', permanent: true },
], 'The legacy Construction URL must permanently redirect to Execution');

const excluded = [
  'api(?:/|$)',
  ...['ventures', 'insights']
    .filter((feature) => features[feature] === false)
    .map((feature) => `${feature}(?:/|$)`),
];

assert.deepEqual(vercelConfig.rewrites, [
  { source: `/((?!${excluded.join('|')}).*)`, destination: '/index.html' },
], 'Vercel rewrites must match the disabled routes in siteFeatures.json');
