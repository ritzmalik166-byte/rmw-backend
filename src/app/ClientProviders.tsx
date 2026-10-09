"use client";

import dynamic from "next/dynamic";
import { BlogProvider } from "@/blogContext/BlogContext";


const VisitTracker = dynamic(
  () => import("@/components/visitorTracker/tracker"),
  { ssr: false }
);

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogProvider>
      {/* <SmoothScroller /> */}
      <VisitTracker />
      {children}
    </BlogProvider>
  );
}
