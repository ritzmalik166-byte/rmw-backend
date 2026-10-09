/**
 * Lead / contact forms: local part (before @) must be at least 3 characters
 * and cannot be digits-only. Standard `user@domain.tld` shape.
 */
export const CONTACT_EMAIL_PATTERN =
    /^(?=[^\s@]{3,}@)(?![0-9]+@)[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** HTML `title` on constrained inputs */
export const CONTACT_EMAIL_TITLE =
    "@ se pehle kam se kam 3 akshar hon; @ se pehla hissa sirf numbers ka na ho.";

/** Toasts / inline errors (English) */
export const CONTACT_EMAIL_ERROR_EN =
    "Use a valid email: at least 3 characters before @, and the part before @ cannot be only numbers.";

export function isValidContactEmail(email: string): boolean {
    const t = email.trim();
    if (!t) return false;
    return CONTACT_EMAIL_PATTERN.test(t);
}
