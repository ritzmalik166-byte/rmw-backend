import { POST as importGoogleDoc } from "@/app/api/ritz_blogs/upload/route";

/** Alias for the Google Docs blog importer at /api/ritz_blogs/upload */
export async function POST(request: Request) {
  return importGoogleDoc(request);
}
