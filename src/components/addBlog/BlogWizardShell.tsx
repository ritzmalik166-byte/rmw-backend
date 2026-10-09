"use client";

import Link from "next/link";
import { Check, ChevronRight, FileText, Home, Monitor, PenLine } from "lucide-react";

const STEPS = [
  { id: 1, label: "Blog Details", description: "Title, SEO & cover image" },
  { id: 2, label: "Write Content", description: "Pages & rich text body" },
  { id: 3, label: "Publish", description: "Draft, schedule or go live" },
];

interface BlogStepProgressProps {
  currentStep: 1 | 2 | 3;
}

export default function BlogStepProgress({ currentStep }: BlogStepProgressProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {STEPS.map((step, index) => {
          const isComplete = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-1 items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  isComplete
                    ? "bg-emerald-500 text-white"
                    : isActive
                      ? "bg-[#2955B3] text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {isComplete ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-sm font-semibold ${
                    isActive ? "text-[#0B1623]" : "text-slate-500"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-xs text-slate-400">{step.description}</p>
              </div>
              {index < STEPS.length - 1 && (
                <ChevronRight className="hidden h-4 w-4 shrink-0 text-slate-300 lg:block lg:ml-auto" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface BlogWizardShellProps {
  currentStep?: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  breadcrumbExtra?: string;
  /** Defaults to "Add Blog" — use for alternate workflows like Google Docs import */
  breadcrumbLabel?: string;
  /** Defaults to "Blog Studio" */
  badgeLabel?: string;
  /** Hide the 3-step progress bar (e.g. single-page import form) */
  hideSteps?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function BlogWizardShell({
  currentStep = 1,
  title,
  subtitle,
  breadcrumbExtra,
  breadcrumbLabel = "Add Blog",
  badgeLabel = "Blog Studio",
  hideSteps = false,
  children,
  footer,
}: BlogWizardShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F8FAFC_0%,#EEF2FF_100%)] p-4 md:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2955B3] shadow-sm">
              <PenLine className="h-3.5 w-3.5" />
              {badgeLabel}
            </div>
            <h1 className="text-2xl font-bold text-[#0B1623] sm:text-3xl">{title}</h1>
            {subtitle && <p className="mt-1 max-w-2xl text-sm text-slate-500">{subtitle}</p>}
          </div>
          <Link
            href="/admin/manage-blogs"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-[#2955B3]"
          >
            <FileText className="h-4 w-4" />
            Manage Blogs
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
          <Link href="/" target="_blank" className="inline-flex items-center gap-1.5 text-[#2955B3] hover:underline">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Monitor className="h-4 w-4" />
            {breadcrumbLabel}
          </span>
          {breadcrumbExtra && (
            <>
              <span className="text-slate-300">/</span>
              <span className="font-medium text-slate-700">{breadcrumbExtra}</span>
            </>
          )}
        </div>

        {!hideSteps && <BlogStepProgress currentStep={currentStep} />}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
          {children}
        </div>

        {footer && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            {footer}
          </div>
        )}

        <footer className="pb-4 text-center text-xs text-slate-400">
          Designed and Developed by <strong className="text-[#2955B3]">Ritz Media World</strong>
        </footer>
      </div>
    </div>
  );
}

export function BlogField({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export const blogInputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#2955B3] focus:bg-white focus:ring-2 focus:ring-blue-100";

export const blogPrimaryBtnClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#2955B3] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1e3f8a] disabled:cursor-not-allowed disabled:opacity-60";

export const blogSecondaryBtnClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50";
