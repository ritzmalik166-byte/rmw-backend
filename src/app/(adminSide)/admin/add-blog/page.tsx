"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useBlogContext } from "@/blogContext/BlogContext";
import { clearAddBlogDraft } from "@/lib/addBlogDraft";
import { BlogWizardShell, blogPrimaryBtnClass } from "@/components/addBlog/BlogWizardShell";
import { CalendarClock, FilePenLine, PenLine, Rocket, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: <PenLine className="h-5 w-5" />,
    title: "Simple 2-step flow",
    text: "Fill in blog details, write your content, then publish — no confusion.",
  },
  {
    icon: <FilePenLine className="h-5 w-5" />,
    title: "Save as draft",
    text: "Not ready yet? Save your work and finish later from Manage Blogs.",
  },
  {
    icon: <CalendarClock className="h-5 w-5" />,
    title: "Schedule posts",
    text: "Pick a date and time to publish automatically when you're ready.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: "Publish instantly",
    text: "Go live immediately when your blog is complete and reviewed.",
  },
];

const Page = () => {
  const { resetBlogForm } = useBlogContext();

  useEffect(() => {
    clearAddBlogDraft();
    resetBlogForm();
  }, [resetBlogForm]);

  return (
    <BlogWizardShell
      currentStep={1}
      title="Create a new blog post"
      subtitle="A guided writing experience designed to be simple for every team member."
      breadcrumbExtra="Getting started"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Your previous unsaved session was cleared so you start fresh.
          </p>
          <Link href="/admin/add-blog/step-1" className={blogPrimaryBtnClass}>
            Start writing
          </Link>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            New · Draft & Schedule support
          </div>
          <h2 className="text-2xl font-bold text-[#0B1623]">
            Write, schedule, or save — your choice
          </h2>
          <p className="text-sm leading-relaxed text-slate-600">
            This editor walks you through everything step by step. Add your title and SEO
            details first, write rich content on the next screen, then choose to publish now,
            schedule for later, or save as a draft.
          </p>
          <Link href="/admin/add-blog/step-1" className={blogPrimaryBtnClass}>
            Start writing blog
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2955B3] shadow-sm">
                {feature.icon}
              </div>
              <p className="font-semibold text-slate-800">{feature.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </BlogWizardShell>
  );
};

export default Page;
