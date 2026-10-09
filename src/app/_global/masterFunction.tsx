import { cache } from "react";

//fetching header data
export const fetchHeaderData = cache(async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/header_data`, {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
    cache: "force-cache",     // Cache behavior
  });
  if (!res.ok) {
    throw new Error("Failed to fetch menu");
  }
  const data = await res.json();
  return data;
});
