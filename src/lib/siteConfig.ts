export const SITE_NAME = "Parlay Calculator";
export const SITE_SHORT_NAME = "Parlay";
export const SITE_ORIGIN = "https://parlaycalculator.net";
export const SITE_DOMAIN = "parlaycalculator.net";
export const SITE_TAGLINE =
  "Free parlay calculator for sports betting — convert odds, build multi-leg parlays, and see exact payouts in American, decimal, or fractional format.";

export const CONTACT_EMAIL = "support@parlaycalculator.net";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261014-pc1";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public */
export const BRAND_LOGO = "/android-chrome-512x512.png";
export const BRAND_LOGO_MARK = "/logo-icon.svg";
export const BRAND_LOGO_HORIZONTAL = "/logo-horizontal-white-text.png";
export const BRAND_LOGO_HORIZONTAL_DARK = "/logo-horizontal-dark-text.png";
export const BRAND_HERO = "/parlay-calculator.webp";
export const BRAND_FEATURE_2 = "/parlay-calculator-1.webp";
export const BRAND_FEATURE_3 = "/parlay-calculator-2.webp";
export const BRAND_FEATURE_4 = "/parlay-calculator-3.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x600.png");

/** Visible rating used for SoftwareApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "18420",
  bestRating: "5",
  worstRating: "1",
} as const;
