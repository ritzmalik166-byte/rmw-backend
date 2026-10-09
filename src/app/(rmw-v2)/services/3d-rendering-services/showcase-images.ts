export type ShowcaseImage = {
    id: number;
    image: string;
    alt: string;
    title: string;
};

/** Portrait / tall assets (height > width) — shown at the end of the gallery. */
const PORTRAIT_FILENAMES = new Set(["3d10.png", "3d11.png", "3d12.png"]);

/** Public folder paths; encode filenames with spaces or special characters. */
function showcaseSrc(filename: string): string {
    return `/services/3drendring/${encodeURIComponent(filename)}`;
}

function labelFromFilename(filename: string): string {
    return filename
        .replace(/\.(jpe?g|png|webp)$/i, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function buildItem(id: number, filename: string, label?: string): ShowcaseImage {
    const displayLabel = label ?? labelFromFilename(filename);
    return {
        id,
        image: showcaseSrc(filename),
        alt: `${displayLabel} – 3D rendering showcase by Ritz Media World`,
        title: `${displayLabel} – 3D rendering showcase`,
    };
}

const LEGACY_SHOWCASE: { file: string; label: string }[] = [
    { file: "3d1.png", label: "3D exterior rendering showcase" },
    { file: "3d2.png", label: "3D interior rendering showcase" },
    { file: "3d3.png", label: "Aerial township 3D rendering showcase" },
    { file: "3d4.png", label: "3D floor plan rendering showcase" },
    { file: "3d5.png", label: "Amenity and landscape 3D rendering showcase" },
    { file: "3d6.png", label: "Commercial 3D rendering showcase" },
    { file: "3d7.png", label: "Residential 3D rendering showcase" },
    { file: "3d8.png", label: "Luxury villa 3D rendering showcase" },
    { file: "3d9.png", label: "Mixed-use development 3D rendering showcase" },
    { file: "3d10.png", label: "High-rise 3D rendering showcase" },
    { file: "3d11.png", label: "Master plan 3D rendering showcase" },
    { file: "3d12.png", label: "Real estate 3D visualization showcase" },
];

const NEW_SHOWCASE_FILENAMES = [
    "f13.png",
    "f12.png",
    "Site f1.jpeg",
    "Site f2.jpeg",
    "FN2.jpeg",
    "f4.jpeg",
    "f16.jpeg",
    "GIVE_ME_A_202604161149.png",
    "GIVE_ME_A_202604161205.png",
    "create_right_angle_shot_of_202605290327.jpeg",
    "F13.jpeg",
    "F16 B.jpeg",
    "F17.jpeg",
    "f17 (1).jpeg",
    "Use_this_exact_image_to_202605191704.png",
    "use_this_exact_image_AND_202605191747.jpeg",
    "grs_02066fc.png",
    
] as const;

const legacyLandscape = LEGACY_SHOWCASE.filter((item) => !PORTRAIT_FILENAMES.has(item.file));
const legacyPortrait = LEGACY_SHOWCASE.filter((item) => PORTRAIT_FILENAMES.has(item.file));

const orderedEntries = [
    ...legacyLandscape.map((item) => ({ file: item.file, label: item.label })),
    ...NEW_SHOWCASE_FILENAMES.map((file) => ({ file, label: undefined as string | undefined })),
    ...legacyPortrait.map((item) => ({ file: item.file, label: item.label })),
];

export const SHOWCASE_IMAGES: ShowcaseImage[] = orderedEntries.map((entry, index) =>
    buildItem(index + 1, entry.file, entry.label)
);

/** Initial visible count: 8 in first row + 3 in second row (unchanged layout). */
export const SHOWCASE_INITIAL_VISIBLE = 11;
