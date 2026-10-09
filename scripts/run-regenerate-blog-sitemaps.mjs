import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "package.json"));
const { regenerateBlogSitemaps } = require("../next-sitemap.regenerate-blogs.js");

const result = await regenerateBlogSitemaps();
process.stdout.write(`${JSON.stringify(result)}\n`);
process.exit(result.ok ? 0 : 1);
