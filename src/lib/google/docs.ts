import { google } from "googleapis";
export { extractGoogleDocId } from "@/lib/google/docId";

const DOCS_SCOPE = "https://www.googleapis.com/auth/documents.readonly";

function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKeyRaw) {
    throw new Error(
      "Google Docs credentials are not configured. Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY."
    );
  }

  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [DOCS_SCOPE],
  });
}

/** Fetch a Google Doc by ID using a service account (server-side only). */
export async function fetchGoogleDoc(documentId: string) {
  const auth = getGoogleAuth();
  const docs = google.docs({ version: "v1", auth });

  const response = await docs.documents.get({
    documentId,
    includeTabsContent: false,
  });

  return response.data;
}
