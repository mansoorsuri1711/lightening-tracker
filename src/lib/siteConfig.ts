export const SITE_NAME = "Florida Paycheck Calculator";
export const SITE_SHORT_NAME = "FL Paycheck Calc";
export const SITE_ORIGIN = "https://floridapaycheckcalc.com";
export const SITE_DOMAIN = "floridapaycheckcalc.com";
export const SITE_TAGLINE =
  "Estimate Florida take-home pay after federal income tax and FICA — with $0 state income tax built in.";

export const CONTACT_EMAIL = "support@floridapaycheckcalc.com";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261004-fl1";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public */
export const BRAND_LOGO = "/favicon-512x512.png";
export const BRAND_LOGO_MARK = "/android-chrome-512x512.png";
export const BRAND_LOGO_HORIZONTAL = "/maskable-icon-512x512.png";
export const BRAND_HERO = "/hero-florida-paycheck-calculator.webp";
export const BRAND_BREAKDOWN = "/florida-paycheck-breakdown.webp";
export const BRAND_HOW_TO = "/how-to-calculate-florida-take-home-pay.webp";
export const BRAND_NO_STATE_TAX = "/florida-no-state-income-tax.webp";
export const BRAND_PAY_FREQUENCY = "/florida-pay-frequency-comparison.webp";
export const BRAND_FICA = "/fica-taxes-explained.webp";
export const BRAND_BRACKETS = "/federal-tax-brackets-2026.webp";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.webp");
export const OG_IMAGE_SQUARE = metaAsset("/feature/og-square-1200x1200.webp");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x675.webp");

/** Visible rating used for WebApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "18420",
  bestRating: "5",
  worstRating: "1",
} as const;
