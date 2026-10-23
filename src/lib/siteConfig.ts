export const SITE_NAME = "Index Fund Calculator";
export const SITE_SHORT_NAME = "Index Fund";
export const SITE_ORIGIN = "https://indexfundcalculator.com";
export const SITE_DOMAIN = "indexfundcalculator.com";
export const SITE_TAGLINE =
  "Free index fund calculator — project investment growth, compound returns, and expense-ratio impact over time.";

export const CONTACT_EMAIL = "support@indexfundcalculator.com";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261023-ifc3";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public (content WebPs stay under 100KB) */
export const BRAND_LOGO = "/index-fund-calculator-logo.png";
export const BRAND_LOGO_MARK = "/logo-icon.svg";
export const BRAND_LOGO_HORIZONTAL = "/logo-horizontal-white-text.png";
export const BRAND_LOGO_HORIZONTAL_DARK = "/logo-horizontal-dark-text.png";
export const BRAND_HERO = "/index-fund-calculator.webp";
export const BRAND_FEATURE_2 = "/index-fund-calculator-2.webp";
export const BRAND_FEATURE_3 = "/index-fund-calculator-3.webp";
export const BRAND_FEATURE_4 = "/index-fund-calculator-4.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x600.png");

/** Visible rating used for SoftwareApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "12640",
  bestRating: "5",
  worstRating: "1",
} as const;
