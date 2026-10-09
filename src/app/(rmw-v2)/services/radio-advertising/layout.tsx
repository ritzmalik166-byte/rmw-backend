import type { Metadata } from "next";
import type { ReactNode } from "react";

const CANONICAL = "https://ritzmediaworld.com/services/radio-advertising";

export const metadata: Metadata = {
    title: "Radio Advertising Agency in India | FM & Audio Ad Booking",
    description:
        "Boost your brand with expert FM radio ads. India's trusted radio advertising agency for audio ad booking, scriptwriting, and campaign execution.",
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    keywords: [
        "Best Radio Advertising Agency",
        "Radio Advertising Services",
        "top radio ad agency",
        "FM & Digital Radio Campaigns",
        "PAN India FM Ad Booking",
        "Top Radio Advertising Agency",
        "Creative Voice Campaigns",
        "FM Radio Ads for Businesses",
        "Radio Commercial Production & Placement",
        "famous FM radio",
        "360° Audio Branding Strategy",
        "Local & National Radio Advertising",
        "Creative Audio Ad Production",
        "Book FM Radio Ads Online",
        "Best Radio Advertising Rates",
        "Best Radio Jockey",
        "famous rj in india",
        "Best Radio Ads Services in Delhi",
        "Best Radio Ads Services in Noida",
    ],
    alternates: {
        canonical: CANONICAL,
    },
    openGraph: {
        title: "Radio Advertising Agency in India | FM & Audio Ad Booking",
        description:
            "Boost your brand with expert FM radio ads. India's trusted radio advertising agency for audio ad booking, scriptwriting, and campaign execution.",
        type: "website",
        url: CANONICAL,
    },
    twitter: {
        card: "summary_large_image",
        title: "Radio Advertising Agency in India | FM & Audio Ad Booking",
        description:
            "Boost your brand with expert FM radio ads. India's trusted radio advertising agency for audio ad booking, scriptwriting, and campaign execution.",
    },
};

export default function RadioAdvertisingPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
