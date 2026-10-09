export type GalleryCategory =
  | "team"
  | "event"
  | "awards"
  | "creative"
  | "office";

export type GalleryImage = {
  src: string;
  category: GalleryCategory;
  label: string;
  title: string;
};

const GALLERY_TITLE_SUFFIX = " | Ritz Media World Memories Gallery";

/** Document & SEO title for /gallery (used in layout metadata). */
export const GALLERY_PAGE_TITLE =
  "Ritz Media World Memories Gallery | Team Moments & Event Highlights";

export const GALLERY_PAGE_DESCRIPTION =
  "Browse the Ritz Media World Memories Gallery featuring team celebrations, office events, behind-the-scenes moments, achievements, and unforgettable experiences that reflect our culture and people-first approach.";

export const GALLERY_PAGE_KEYWORDS =
  "Ritz Media World memories, team gallery, office events photos, company culture images, RMW team moments, corporate celebrations, employee activities, behind the scenes Ritz Media World, event highlights gallery, Digital marketing agency, Creative agency, Social media marketing";

export const GALLERY_CANONICAL_URL = "https://ritzmediaworld.com/gallery";

export type GalleryImageInput = { src: string; label: string };

function buildGalleryImages(
  items: { src: string; category: GalleryCategory; label: string }[]
): GalleryImage[] {
  return items.map((item) => ({
    ...item,
    title: `${item.label}${GALLERY_TITLE_SUFFIX}`,
  }));
}

function withCategory(
  items: GalleryImageInput[],
  category: GalleryCategory
): { src: string; category: GalleryCategory; label: string }[] {
  return items.map((item) => ({ ...item, category }));
}

/** One row per image file — first category wins if a src was listed twice. */
function mergeGalleryInputs(
  groups: { category: GalleryCategory; items: GalleryImageInput[] }[]
): GalleryImage[] {
  const seen = new Set<string>();
  const merged: GalleryImage[] = [];

  for (const { category, items } of groups) {
    for (const item of items) {
      if (seen.has(item.src)) continue;
      seen.add(item.src);
      merged.push({
        src: item.src,
        category,
        label: item.label,
        title: `${item.label}${GALLERY_TITLE_SUFFIX}`,
      });
    }
  }

  return merged;
}

export const GALLERY_FILTER_OPTIONS: { id: "all" | GalleryCategory; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "team", label: "Team" },
    { id: "event", label: "Events" },
    { id: "awards", label: "Awards" },
    { id: "creative", label: "RNR" },
    { id: "office", label: "Office" },
  ];

/** H2 titles for the three featured columns (matches GALLERY_FEATURE_STRIP order). */
export const GALLERY_FEATURE_HEADINGS = [
  "Team Celebrations",
  "Behind the Scenes",
  "Awards & Recognition",
] as const;

/** Categories shown in the feature-card modal (index matches GALLERY_FEATURE_STRIP). */
export const GALLERY_FEATURE_MODAL_CATEGORIES: GalleryCategory[][] = [
  ["event", "team"],
  ["office"],
  ["awards"],
];

/** All gallery images for a feature card modal (includes feature image + grid). */
export function getFeatureModalImages(featureIndex: number): GalleryImage[] {
  const categories = GALLERY_FEATURE_MODAL_CATEGORIES[featureIndex];
  if (!categories?.length) return [];

  const allowed = new Set(categories);
  return GALLERY_IMAGES.filter(
    (img) => img.src !== GALLERY_HERO.src && allowed.has(img.category)
  );
}

export const GALLERY_CTA = {
  heading: "Behind Every Award, there are Client Success Stories.",
  bodyLead: "Join hundreds of brands that have trusted ",
  brandLabel: "Ritz Media World",
  bodyTrail:
    " to deliver impactful advertising and measurable results since 2008.",
  homeHref: "https://ritzmediaworld.com/",
  homeTitle: "Ritz Media World - Home",
  buttonLabel: "Let's Build Your Next Winning Campaign",
  href: "/contact.html",
  target: "_blank",
  rel: "noopener noreferrer",
  linkTitle:
    "Contact Ritz Media World — Let's Build Your Next Winning Campaign",
} as const;

export const GALLERY_FEATURE_STRIP = buildGalleryImages([
  {
    src: "/gallery/Team party.jpg",
    category: "event",
    label: "Team Celebrations",
  },
  {
    src: "/gallery/DSC01566.JPG",
    category: "team",
    label: "Behind the Scenes",
  },
  {
    src: "/gallery/Most Trusted Advertising Agency in NCR by The Economic Times.jpg",
    category: "awards",
    label: "Awards & Recognition",
  },
]);

export const GALLERY_HERO = buildGalleryImages([
  {
    src: "/gallery/photo_6120522001500805655_y.jpg",
    category: "team",
    label: "Team Moment",
  },
])[0];

export const GALLERY_HERO_IMAGE = GALLERY_HERO.src;

export type GalleryStat = {
  label: string;
  /** Animate from 0 when set */
  value?: number;
  suffix?: string;
  /** Static symbol (no count-up), e.g. ∞ */
  symbol?: string;
};

export const GALLERY_STATS: GalleryStat[] = [
  { value: 17, suffix: "+", label: "Years of Excellence" },
  { value: 90, suffix: "+", label: "Team Members" },
  { value: 200, suffix: "+", label: "Brands Served" },
  { symbol: "∞", label: "Memories Made" },
];

export const GALLERY_MARQUEE_ITEMS = [
  "Team Moments",
  "Creative Minds",
  "Event Highlights",
  "Award Winning",
  "Delhi NCR's Finest",
  "People-First Culture",
  "Behind The Scenes",
  "Celebrations",
] as const;

/** Team — group portraits, staff photos, people collaborating at work. */
const GALLERY_TEAM_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/rmw_team.jpg", label: "RMW Team" },
  { src: "/gallery/New Team Image (18-Nov-2025).jpg", label: "Team Photo" },
  { src: "/gallery/team.jpg", label: "New Team" },
  { src: "/gallery/team 4.jpg", label: "Team Four" },
  { src: "/gallery/RMW.jpg", label: "RMW Family" },
  { src: "/gallery/Ritz media world R.jpg", label: "Team Formation" },
  { src: "/gallery/DSC03108.JPG", label: "The RMW Team" },
  { src: "/gallery/IMG-20251211-WA0020.jpg", label: "Team Smiles" },
  { src: "/gallery/IMG-20250930-WA0091.jpg", label: "September" },
  { src: "/gallery/IMG-20250930-WA0102.jpg", label: "Team Spirit" },
  { src: "/gallery/IMG-20250930-WA0103.jpg", label: "Team Portrait" },
  { src: "/gallery/photo_2025-09-16_15-21-08.jpg", label: "September Vibes" },
  { src: "/gallery/photo_2025-06-24_12-32-10.jpg", label: "June Gathering" },
  { src: "/gallery/photo_2025-10-17_18-11-07.jpg", label: "Team Connect" },
  { src: "/gallery/photo_2025-10-17_18-11-11.jpg", label: "Team Huddle" },
  { src: "/gallery/photo_2025-11-11_10-40-36.jpg", label: "November" },
  { src: "/gallery/Creative Team2.JPG", label: "Creative Team" },
  { src: "/gallery/Creative team.JPG", label: "Creative Squad" },
  { src: "/gallery/Creative team Editing.JPG", label: "Editing Suite" },
  { src: "/gallery/Media 2.jpg", label: "Media Work" },
  { src: "/gallery/17e24618-1ebc-dd6c-1887-291bde275d77_1460_550.webp", label: "Campaign Work" },
  { src: "/gallery/photo_6186250402882325719_y.jpg", label: "Creative Crew" },
  { src: "/gallery/photo_6131826449913155860_y.jpg", label: "On Location Shoot" },
];

/** Events — parties, festivals, outings, and award ceremonies. */
const GALLERY_EVENT_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/photo_2025-03-12_18-48-20.jpg", label: "Holi Celebration" },
  { src: "/gallery/photo_2025-03-12_18-48-19.jpg", label: "March Event" },
  { src: "/gallery/photo_2025-03-12_18-58-33.jpg", label: "March Moments" },
  { src: "/gallery/photo_2025-10-17_18-11-15.jpg", label: "Festive Team Day" },
  { src: "/gallery/photo_2025-10-17_18-15-59.jpg", label: "Office Festivities" },
  { src: "/gallery/photo_2025-11-28_22-19-28.jpg", label: "Celebration Night" },
  { src: "/gallery/Team 6.jpg", label: "Team Outing" },
  { src: "/gallery/IMG20250916125830.jpg", label: "Team Dinner" },
  { src: "/gallery/WhatsApp Image 2025-12-11 at 13.21.14_8262e416.jpg", label: "December Celebration" },
  // { src: "/gallery/WhatsApp Image 2025-12-11 at 13.17.51_db030edb.jpg", label: "Memories" },
  { src: "/gallery/WhatsApp Image 2025-12-11 at 13.18.12_625665af.jpg", label: "Festive Day" },
  { src: "/gallery/IMG-20251211-WA0034.jpg", label: "On Stage Award" },
  { src: "/gallery/IMG-20251211-WA0043.jpg", label: "Panel Discussion" },
  { src: "/gallery/IMG-20251211-WA0038.jpg", label: "Dream Makers Conclave" },
  { src: "/gallery/IMG-20251211-WA0010.jpg", label: "Office Party" },
  { src: "/gallery/IMG-20251211-WA0030.jpg", label: "Festive Cheer" },
  { src: "/gallery/IMG-20251211-WA0095.jpg", label: "Year End Bash" },
  { src: "/gallery/IMG-20251211-WA0016.jpg", label: "Party Mode" },
  { src: "/gallery/IMG-20251211-WA0052.jpg", label: "Fun Times" },
  { src: "/gallery/IMG-20251211-WA0040.jpg", label: "Team Celebration" },
  { src: "/gallery/IMG-20251211-WA0045.jpg", label: "Together Again" },
  { src: "/gallery/IMG-20251211-WA0026.jpg", label: "December" },
  { src: "/gallery/IMG-20251211-WA0004.jpg", label: "Office Fest" },
  { src: "/gallery/IMG-20251211-WA0018.jpg", label: "Holiday Cheer" },
  { src: "/gallery/IMG-20251211-WA0042.jpg", label: "Group Celebration" },
  // { src: "/gallery/IMG-20251211-WA0032.jpg", label: "Office Joy" },
  { src: "/gallery/IMG-20251211-WA0041.jpg", label: "Year-End Party" },
  { src: "/gallery/IMG-20251211-WA0088.jpg", label: "Festive Gathering" },
  { src: "/gallery/Best Real Estate Podcast_Beyond The Blueprints Team.jpeg", label: "Podcast Team" },
  { src: "/gallery/photo_6186250402882325664_x.jpg", label: "Industry Event" },
  { src: "/gallery/photo_6186250402882325665_x.jpg", label: "ET Young Leaders" },
  { src: "/gallery/photo_6186250402882325716_y.jpg", label: "Birthday Cake" },
  { src: "/gallery/photo_6186250402882325717_y.jpg", label: "Birthday Celebration" },
  { src: "/gallery/photo_6131826449913155861_y.jpg", label: "Big Dream Makers Awards" },
  { src: "/gallery/photo_6131826449913155862_y.jpg", label: "Team Group Photo" },
];

/** Awards — trophies, framed certificates, and industry recognition. */
const GALLERY_AWARDS_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/Trusted Digital Advertising Agency in NCR-Awarded by The Economic Times.jpg", label: "ET Trusted Award" },
  { src: "/gallery/Special Achievement Award in Retail Category.jpg", label: "Retail Award" },
  { src: "/gallery/RMW 17 Years Complete.png", label: "17 Years Complete" },
  { src: "/gallery/IMG-20251211-WA0007.jpg", label: "Radio City Recognition" },
  { src: "/gallery/IMG-20251211-WA0011.jpg", label: "Hindustan Times Feature" },
  {
    src: "/gallery/Best Real Estate Podcast_Beyond The Blueprints.jpeg",
    label: "Podmasters Trophy",
  },
  { src: "/gallery/photo_2025-11-14_22-06-51.jpg", label: "Big Dream Makers Award" },
  { src: "/gallery/photo_2025-11-14_22-06-41.jpg", label: "Big Dream Makers Trophy" },
  { src: "/gallery/photo_2025-11-28_21-59-05.jpg", label: "ET Young Leaders Trophy" },
  { src: "/gallery/photo_2025-11-28_22-19-27.jpg", label: "ET Awards Ceremony" },
  // { src: "/gallery/photo_2025-11-28_22-22-29.jpg", label: "ET Young Leaders" },
  { src: "/gallery/photo_2025-11-28_21-59-05 (3).jpg", label: "ET Young Leaders Display" },
  { src: "/gallery/photo_2025-11-15_00-42-59.jpg", label: "BIG Business Awards" },
  // { src: "/gallery/photo_2025-11-15_00-43-00.jpg", label: "Awardee Moment" },
  { src: "/gallery/photo_2025-11-15_00-43-02.jpg", label: "My Property Fact Award" },
];

/** R & R — Rewards & Recognition (Star of the Month only). */
const GALLERY_STAR_OF_MONTH_SRCS = [
  "/gallery/photo_6120522001500805693_y.jpg",
  "/gallery/photo_6120522001500805694_y.jpg",
  "/gallery/photo_6120522001500805695_y.jpg",
  "/gallery/photo_6120522001500805696_y.jpg",
  "/gallery/photo_6120522001500805697_y.jpg",
  "/gallery/photo_6120522001500805698_y.jpg",
  "/gallery/photo_6120522001500805701_y.jpg",
  "/gallery/photo_6120522001500805702_y.jpg",
  "/gallery/photo_6120522001500805703_y.jpg",
  "/gallery/photo_6120522001500805705_y.jpg",
  "/gallery/photo_6120522001500805706_y.jpg",
] as const;

const GALLERY_CREATIVE_INPUTS: GalleryImageInput[] =
  GALLERY_STAR_OF_MONTH_SRCS.map((src, index) => ({
    src,
    label:
      index === 0
        ? "Star of the Month"
        : `Star of the Month — Recognition ${index + 1}`,
  }));

/** Office — workspaces, studios, and office interiors (no team events). */
const GALLERY_OFFICE_INPUTS: GalleryImageInput[] = [
  { src: "/gallery/Ritz media world_.jpg", label: "The Space" },
  { src: "/gallery/Ritz1.JPG", label: "Ritz Studio" },
  { src: "/gallery/Ritz Media World Digital Office.jpg", label: "Digital Office" },
  { src: "/gallery/DSC03053.JPG", label: "Studio Shot" },
  { src: "/gallery/DSC03178.JPG", label: "Office Space" },
  { src: "/gallery/DSC00086.JPG", label: "The Office" },
  { src: "/gallery/photo_6120522001500805657_y.jpg", label: "Executive Suite" },
  { src: "/gallery/photo_6120522001500805658_y.jpg", label: "Conference Room" },
  { src: "/gallery/photo_6120522001500805659_y.jpg", label: "Open Workspace" },
  { src: "/gallery/photo_6120522001500805660_y.jpg", label: "Office Lounge" },
  { src: "/gallery/photo_6127323211063037683_y.jpg", label: "Open Office Floor" },
  { src: "/gallery/photo_6127323211063037684_y.jpg", label: "Creative Workspace" },
];

const GALLERY_INPUT_GROUPS: { category: GalleryCategory; items: GalleryImageInput[] }[] =
  [
    { category: "team", items: GALLERY_TEAM_INPUTS },
    { category: "event", items: GALLERY_EVENT_INPUTS },
    { category: "awards", items: GALLERY_AWARDS_INPUTS },
    { category: "creative", items: GALLERY_CREATIVE_INPUTS },
    { category: "office", items: GALLERY_OFFICE_INPUTS },
  ];

export const GALLERY_IMAGES = mergeGalleryInputs(GALLERY_INPUT_GROUPS);

export const GALLERY_IMAGES_BY_CATEGORY: Record<GalleryCategory, GalleryImage[]> = {
  team: GALLERY_IMAGES.filter((img) => img.category === "team"),
  event: GALLERY_IMAGES.filter((img) => img.category === "event"),
  awards: GALLERY_IMAGES.filter((img) => img.category === "awards"),
  creative: GALLERY_IMAGES.filter((img) => img.category === "creative"),
  office: GALLERY_IMAGES.filter((img) => img.category === "office"),
};

export const GALLERY_FILTER_HEADINGS: Record<
  "all" | GalleryCategory,
  { primary: string; accent: string }
> = {
  all: { primary: "All", accent: "Memories" },
  team: { primary: "Team", accent: "Memories" },
  event: { primary: "Events", accent: "Memories" },
  awards: { primary: "Awards", accent: "Memories" },
  creative: { primary: "RNR", accent: "Memories" },
  office: { primary: "Office", accent: "Memories" },
};

const FEATURE_STRIP_SRCS = new Set(GALLERY_FEATURE_STRIP.map((item) => item.src));

/** Grid images only — excludes hero + feature strip; each file appears once. */
export const GALLERY_GRID_IMAGES = (() => {
  const seen = new Set<string>();
  return GALLERY_IMAGES.filter((img) => {
    if (img.src === GALLERY_HERO.src || FEATURE_STRIP_SRCS.has(img.src)) {
      return false;
    }
    if (seen.has(img.src)) return false;
    seen.add(img.src);
    return true;
  });
})();

export type GalleryFilterId = "all" | GalleryCategory;

/** Grid photo counts per filter tab (excludes hero + feature strip). */
export const GALLERY_GRID_COUNTS: Record<GalleryFilterId, number> = (() => {
  const byCategory = Object.fromEntries(
    (Object.keys(GALLERY_IMAGES_BY_CATEGORY) as GalleryCategory[]).map((key) => [
      key,
      GALLERY_IMAGES_BY_CATEGORY[key].filter(
        (img) => img.src !== GALLERY_HERO.src && !FEATURE_STRIP_SRCS.has(img.src)
      ).length,
    ])
  ) as Record<GalleryCategory, number>;
  return {
    all: GALLERY_GRID_IMAGES.length,
    ...byCategory,
  };
})();

/** Flat src list for legacy gallery components (unique paths only). */
export const GALLERY_IMAGE_SRCS = [
  ...new Set(GALLERY_IMAGES.map((img) => img.src)),
];
