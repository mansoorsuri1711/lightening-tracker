export const SITE_NAME = "Body Fat Calculator";
export const SITE_SHORT_NAME = "Body Fat Calc";
export const SITE_ORIGIN = "https://bodyfatcalculator.io";
export const SITE_DOMAIN = "bodyfatcalculator.io";
export const SITE_TAGLINE =
  "Free body fat percentage calculator using the U.S. Navy method — with BMI estimate, category charts, and metric or imperial units.";

export const CONTACT_EMAIL = "support@bodyfatcalculator.io";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261011-bf1";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public */
export const BRAND_LOGO = "/android-chrome-512x512.png";
export const BRAND_LOGO_MARK = "/logo-mark.svg";
export const BRAND_LOGO_HORIZONTAL = "/logo-light-1200x300.png";
export const BRAND_HERO = "/hero-desktop-1920x1080.png";
export const BRAND_HERO_MOBILE = "/hero-mobile-1080x1350.png";
export const BRAND_CHART = "/body-fat-chart-1600x900.png";
export const BRAND_NAVY = "/hero-desktop-1920x1080.png";
export const BRAND_MEASURE = "/body-fat-chart-1600x900.png";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x675.png");

/** Visible rating used for WebApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "22140",
  bestRating: "5",
  worstRating: "1",
} as const;
