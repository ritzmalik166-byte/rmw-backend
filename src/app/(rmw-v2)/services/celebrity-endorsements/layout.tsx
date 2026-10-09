// export default function CelebrityEndorsementsLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <>
//             <link
//                 rel="stylesheet"
//                 href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
//             />
//             <div className="w-full overflow-x-hidden">{children}</div>
//         </>
//     );
// }

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Celebrity Endorsement Agency in India | Partner with Top Celebs",
  description:
    "Top celebrity endorsement agency in Delhi NCR. Connect your brand with Bollywood stars, TV icons & influencers to boost visibility and credibility.",
  keywords: [
    "Celebrity Endorsements",
    "advertising agencies in Noida",
    "Marketing agency",
    "Boost Brand Credibility",
    "Top Celebrity Endorsement Agency",
    "Influencer & Star Campaigns",
    "Hire Celebrities for Brand Endorsements",
    "Trusted PR Network",
  ],
  alternates: {
    canonical: "https://ritzmediaworld.com/services/celebrity-endorsements",
  },
};

export default function CelebrityEndorsementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        title="Remixicon"
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css"
      />
      <div className="w-full overflow-x-hidden">{children}</div>
    </>
  );
}