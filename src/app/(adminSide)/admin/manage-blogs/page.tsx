import ManageBlogs from "@/allPages/manageBlog/ManageBlog";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-slate-500">Loading blogs…</div>}>
      <ManageBlogs />
    </Suspense>
  );
};

export default page;
