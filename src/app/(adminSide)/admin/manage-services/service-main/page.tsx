"use client";

import { Layers3 } from "lucide-react";

export default function ServiceMainPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-[#f3e9d2] p-6 md:p-10">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f3e9d2] px-4 py-1.5 text-sm font-medium text-[#9a7530]">
          <Layers3 className="h-4 w-4" />
          Manage Services
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
          Service Main
        </h1>
        <p className="mt-3 text-slate-600">
          Basic page is ready. You can add Service Main management actions here.
        </p>
      </div>
    </section>
  );
}
