import { aboutPageMetadata } from "../about.metadata";

export const metadata = aboutPageMetadata;

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
