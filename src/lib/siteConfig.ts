export const SITE_NAME = "BMI Calculator Women";
export const SITE_SHORT_NAME = "BMI Women";
export const SITE_ORIGIN = "https://bmicalculatorwomen.io";
export const SITE_DOMAIN = "bmicalculatorwomen.io";
export const SITE_TAGLINE =
  "Free BMI calculator for women — instant body mass index, WHO categories, healthy weight range, and women’s BMI chart. Metric or imperial.";

export const CONTACT_EMAIL = "support@bmicalculatorwomen.io";

/** Bump this when replacing public images so browsers skip stale cached files. */
export const ASSET_VERSION = "20261011-bmw1";

function metaAsset(path: string): string {
  return `${path}?v=${ASSET_VERSION}`;
}

/** Brand & content images in /public */
export const BRAND_LOGO = "/android-chrome-512x512.png";
export const BRAND_LOGO_MARK = "/logo-mark.svg";
export const BRAND_LOGO_HORIZONTAL = "/logo-light-1200x300.png";
export const BRAND_LOGO_HORIZONTAL_DARK = "/logo-dark-1200x300.png";
export const BRAND_HERO = "/hero-desktop-1920x1080.png";
export const BRAND_HERO_MOBILE = "/hero-mobile-1080x1350.png";
export const BRAND_CHART = "/bmi-chart-women-1600x960.png";
export const OG_IMAGE = metaAsset("/feature/og-image-1200x630.png");
export const TWITTER_IMAGE = metaAsset("/feature/twitter-card-1200x675.png");

/** Visible rating used for WebApplication rich results */
export const SITE_RATING = {
  ratingValue: "4.8",
  ratingCount: "28460",
  bestRating: "5",
  worstRating: "1",
} as const;
