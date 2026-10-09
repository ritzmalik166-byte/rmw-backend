/**
 * sessionStorage on Safari / iOS uses a small quota. Large JSON (e.g. full blog
 * HTML bodies) throws and must not fail the rest of the app flow.
 */
export function setSessionStorageSafe(key: string, value: string): boolean {
    if (typeof window === "undefined") return false;
    try {
        sessionStorage.setItem(key, value);
        return true;
    } catch {
        return false;
    }
}
