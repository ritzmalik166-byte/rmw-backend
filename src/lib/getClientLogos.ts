import fs from "fs";
import path from "path";

const LOGO_FILE_PATTERN = /^lg\d+\.(png|jpe?g)$/i;

export function getClientLogos(): string[] {
    const logosDir = path.join(process.cwd(), "public", "newLogos");

    if (!fs.existsSync(logosDir)) {
        return [];
    }

    return fs
        .readdirSync(logosDir)
        .filter((file) => LOGO_FILE_PATTERN.test(file))
        .sort((a, b) => {
            const numA = Number(a.match(/\d+/)?.[0] ?? 0);
            const numB = Number(b.match(/\d+/)?.[0] ?? 0);
            return numA - numB;
        })
        .map((file) => `/newLogos/${file}`);
}
