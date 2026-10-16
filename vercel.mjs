import siteFeatures from './src/data/siteFeatures.json' with { type: 'json' };

const disabledPaths = [
  !siteFeatures.ventures && 'ventures',
  !siteFeatures.insights && 'insights',
].filter(Boolean);

// Requests for disabled pages miss the SPA rewrite and receive Vercel's real
// filesystem 404. The remaining routes still resolve through React Router.
const excluded = ['api/', ...disabledPaths.map((path) => `${path}(?:/|$)`)].join('|');

export const config = {
  rewrites: [
    { source: `/((?!${excluded}).*)`, destination: '/index.html' },
  ],
};
