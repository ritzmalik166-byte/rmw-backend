"use client";

import { BlogProvider } from "@/context/AllBlogContext";
import dynamic from "next/dynamic";
import React from "react";

// const BlogProvider = dynamic(() => import("@/context/AllBlogContext").then(mod => mod.BlogProvider), {
//   ssr: false,
// });

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <BlogProvider>{children}</BlogProvider>;
};
