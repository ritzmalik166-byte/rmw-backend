"use client";

import Link from "next/link";
import React from "react";
import { ChevronRight, LayoutDashboard } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  currentPage: string;
  middleLinks?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPage,
  middleLinks = [],
}) => {
  const crumbs = [
    { name: "Admin", href: "/admin/dashboard" },
    ...middleLinks,
    { name: formatName(currentPage), href: "" },
  ];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap gap-1">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && (
                <LayoutDashboard
                  className="w-3 h-3 flex-shrink-0"
                  style={{ color: "#94A3B8" }}
                />
              )}
              {index > 0 && (
                <ChevronRight
                  className="w-3 h-3 flex-shrink-0"
                  style={{ color: "#CBD5E1" }}
                />
              )}
              {!isLast && crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-xs font-medium transition-colors hover:text-[#C59D4F]"
                  style={{ color: "#64748B" }}
                >
                  {crumb.name}
                </Link>
              ) : (
                <span
                  className="text-xs font-semibold"
                  style={{ color: "#0B1623" }}
                >
                  {crumb.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

function formatName(name: string) {
  return decodeURIComponent(name)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export default Breadcrumb;
