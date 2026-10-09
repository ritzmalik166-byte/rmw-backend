/** URL slug → DB `service_second.link` when they differ */
const SERVICE_SECOND_SLUG_ALIASES: Record<string, Record<string, string>> = {
  "contents-marketing": {
    "customized-content-strategy": "content-marketing",
  },
};

export function resolveServiceSecondSlug(
  parentServiceLink: string,
  slug: string,
): string {
  return SERVICE_SECOND_SLUG_ALIASES[parentServiceLink]?.[slug] ?? slug;
}
