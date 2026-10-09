import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at Ritz Media World – Join Delhi-NCR’s Top Creative Agency",
  description:
    "Explore career opportunities at Ritz Media World in Delhi-NCR. Apply now to work in digital advertising, creative services and brand strategy with industry-leading experts.",
  keywords: "Join Our Team",
  alternates: {
    canonical: "https://ritzmediaworld.com/career2",
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
