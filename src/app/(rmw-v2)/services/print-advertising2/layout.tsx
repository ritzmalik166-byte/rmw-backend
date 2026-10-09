import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Maximize Conversions With Ritz Media World's Print Advertising Services",
    description: "Boost brand recall and conversions with Ritz Media World's customized print advertising. Engaging designs, strategic placement, and compelling copy to engage your audience.",
    authors: [{ name: "Ritz Media World" }],
    publisher: "Ritz Media World",
    keywords: [
        "Print Media Advertising",
        "Print Advertising Services",
        "Brand Visibility",
        "Print Ad Campaigns",
        "Print Media Strategy",
        "Creative Print Ads",
        "Print Media Design",
        "Advertising Solutions",
        "Print Advertising Strategy",
    ],
    openGraph: {
        title: "Maximize Conversions With Ritz Media World's Print Advertising Services",
        description: "Boost brand recall and conversions with Ritz Media World's customized print advertising. Engaging designs, strategic placement, and compelling copy to engage your audience.",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Maximize Conversions With Ritz Media World's Print Advertising Services",
        description: "Boost brand recall and conversions with Ritz Media World's customized print advertising. Engaging designs, strategic placement, and compelling copy to engage your audience.",
    },
};

export default function PrintAdvertisingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}