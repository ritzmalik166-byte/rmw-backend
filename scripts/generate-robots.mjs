import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { siteUrl, ROBOTS_POLICIES } = require("../next-sitemap.shared.js");

function formatPolicyLines(policy) {
  const lines = [`# ${policy.userAgent}`, `User-agent: ${policy.userAgent}`];

  const allows = policy.allow
    ? Array.isArray(policy.allow)
      ? policy.allow
      : [policy.allow]
    : [];
  for (const allow of allows) {
    lines.push(`Allow: ${allow}`);
  }

  const disallows = policy.disallow
    ? Array.isArray(policy.disallow)
      ? policy.disallow
      : [policy.disallow]
    : [];
  for (const disallow of disallows) {
    lines.push(`Disallow: ${disallow}`);
  }

  lines.push("");
  return lines;
}

function generateRobotsTxt() {
  const lines = [];

  for (const policy of ROBOTS_POLICIES) {
    lines.push(...formatPolicyLines(policy));
  }

  lines.push("# Host", `Host: ${siteUrl}`, "", "# Sitemaps", `Sitemap: ${siteUrl}/sitemap.xml`, "");
  return lines.join("\n");
}

const outputPath = path.join(process.cwd(), "public", "robots.txt");
fs.writeFileSync(outputPath, generateRobotsTxt());
console.log("[generate-robots] Wrote public/robots.txt from ROBOTS_POLICIES");
