export type ConnectionType = "mobile" | "broadband" | "hosting" | "VPN" | "unknown";

export interface EnquiryIpInfo {
  ip: string;
  country: string | null;
  state: string | null;
  city: string | null;
  timezone: string | null;
  isp: string | null;
  connectionType: ConnectionType;
  organisation: string | null;
  asn: string | null;
  ipv4: string | null;
  ipv6: string | null;
}

interface IpApiResponse {
  status: string;
  message?: string;
  country?: string;
  regionName?: string;
  city?: string;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  asname?: string;
  mobile?: boolean;
  proxy?: boolean;
  hosting?: boolean;
  query?: string;
}

function isIPv4(ip: string): boolean {
  return /^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip);
}

function isIPv6(ip: string): boolean {
  return ip.includes(":") && !ip.startsWith("::ffff:");
}

function normalizeIp(ip: string): string {
  const trimmed = ip.trim();
  if (trimmed.toLowerCase().startsWith("::ffff:")) {
    return trimmed.slice(7);
  }
  return trimmed;
}

function isUnusableIp(ip: string): boolean {
  const v = ip.trim().toLowerCase();
  return (
    !v ||
    v === "unknown" ||
    v === "localhost" ||
    v === "127.0.0.1" ||
    v === "::1" ||
    v.startsWith("10.") ||
    v.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(v)
  );
}

function resolveConnectionType(data: IpApiResponse): ConnectionType {
  if (data.proxy) return "VPN";
  if (data.hosting) return "hosting";
  if (data.mobile) return "mobile";
  if (data.status === "success") return "broadband";
  return "unknown";
}

function emptyIpInfo(ip: string): EnquiryIpInfo {
  const normalized = normalizeIp(ip);
  return {
    ip: normalized,
    country: null,
    state: null,
    city: null,
    timezone: null,
    isp: null,
    connectionType: "unknown",
    organisation: null,
    asn: null,
    ipv4: isIPv4(normalized) ? normalized : null,
    ipv6: isIPv6(normalized) ? normalized : null,
  };
}

/**
 * Looks up geo / network metadata for a public IP.
 * Pass only the client IP — all enrichment happens here.
 */
export async function getEnquiryIpInfo(ip: string): Promise<EnquiryIpInfo> {
  const normalized = normalizeIp(ip || "");

  if (isUnusableIp(normalized)) {
    return emptyIpInfo(normalized || "unknown");
  }

  try {
    const fields = [
      "status",
      "message",
      "country",
      "regionName",
      "city",
      "timezone",
      "isp",
      "org",
      "as",
      "asname",
      "mobile",
      "proxy",
      "hosting",
      "query",
    ].join(",");

    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(normalized)}?fields=${fields}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      console.error("ip-api request failed:", response.status);
      return emptyIpInfo(normalized);
    }

    const data = (await response.json()) as IpApiResponse;

    if (data.status !== "success") {
      console.error("ip-api lookup unsuccessful:", data.message || data.status);
      return emptyIpInfo(normalized);
    }

    const publicIp = normalizeIp(data.query || normalized);
    const asn =
      data.as?.trim() ||
      (data.asname ? `AS ${data.asname}` : null);

    return {
      ip: publicIp,
      country: data.country?.trim() || null,
      state: data.regionName?.trim() || null,
      city: data.city?.trim() || null,
      timezone: data.timezone?.trim() || null,
      isp: data.isp?.trim() || null,
      connectionType: resolveConnectionType(data),
      organisation: data.org?.trim() || data.asname?.trim() || null,
      asn,
      ipv4: isIPv4(publicIp) ? publicIp : null,
      ipv6: isIPv6(publicIp) ? publicIp : null,
    };
  } catch (error) {
    console.error("getEnquiryIpInfo error:", error);
    return emptyIpInfo(normalized);
  }
}
