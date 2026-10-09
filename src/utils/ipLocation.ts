import * as maxmind from 'maxmind';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'src/utils/GeoLite2-City.mmdb');

let lookup: maxmind.Reader<maxmind.CityResponse>;

export async function getLocationFromIP(ip: string) {
    if (!lookup) {
        lookup = await maxmind.open<maxmind.CityResponse>(dbPath);
    }

    const result = lookup.get(ip);

    if (!result) return null;

    return {
        city: result.city?.names?.en || 'Unknown City',
        country: result.country?.names?.en || 'Unknown Country',
        latitude: result.location?.latitude || null,
        longitude: result.location?.longitude || null,
    };
}
