import { aboutPageMetadata } from "../about.metadata";

export const metadata = aboutPageMetadata;

export default function AboutPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/new-about-imgs/s1/About-Us-page-mob.webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/varunimage/About-Us-banner-new.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      {children}
    </>
  );
}
