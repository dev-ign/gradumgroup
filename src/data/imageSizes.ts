export const imageSizes = {
  hero: '(max-width: 760px) calc(100vw - 32px), (max-width: 1180px) 50vw, 620px',
  wideHero: '(max-width: 760px) calc(100vw - 32px), (max-width: 1440px) calc(100vw - 200px), 1240px',
  constructionHero: '(max-width: 760px) calc(100vw - 2 * clamp(16px, 5vw, 24px)), (max-width: 1180px) calc(100vw - 2 * clamp(24px, 6.9444vw, 100px)), (max-width: 1440px) 45vw, 620px',
  splitHero: '(max-width: 760px) calc(100vw - 2 * clamp(16px, 5vw, 24px)), (max-width: 1099px) min(760px, calc(100vw - 2 * clamp(24px, 6.9444vw, 100px))), (max-width: 1440px) 43vw, 526px',
  card: '(max-width: 760px) calc(100vw - 32px), (max-width: 1180px) 50vw, 400px',
  thumbnail: '(max-width: 760px) calc(100vw - 32px), 64px',
  industryRow: '72px',
  band: '100vw',
} as const;
