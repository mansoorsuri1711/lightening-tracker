export const SITE_NAME = "Lightning Tracker";
export const SITE_SHORT_NAME = "Lightning";
export const SITE_ORIGIN = "https://lightningtracker.net";
export const SITE_DOMAIN = "lightningtracker.net";
export const SITE_TAGLINE =
  "Free lightning tracker and live lightning map — real-time lightning strikes, thunder map style tracking, distance estimates, and thunderstorm awareness.";

export const CONTACT_EMAIL = "support@lightningtracker.net";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261025-lt1";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public (content WebPs stay under 100KB) */
export const BRAND_LOGO = "/logo-icon.png";
export const BRAND_LOGO_MARK = "/logo-icon.svg";
export const BRAND_LOGO_HORIZONTAL = "/logo-horizontal-white-text.png";
export const BRAND_LOGO_HORIZONTAL_DARK = "/logo-horizontal-dark-text.png";
export const BRAND_HERO = "/lightning-tracker.webp";
export const BRAND_FEATURE_2 = "/lightning-tracker-app.webp";
export const BRAND_FEATURE_3 = "/lightning-tracker-tool.webp";
export const BRAND_FEATURE_4 = "/best-lightning-tracker.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x600.png");

/** Visible rating used for SoftwareApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "18420",
  bestRating: "5",
  worstRating: "1",
} as const;
