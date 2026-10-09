// utils/reverseGeocode.ts
import postalData from '../test/in-postal.json';

type PostalPoint = {
  postalCode: string;
  place: string;
  lat: number;
  lon: number;
};

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearestPostalInfo(
  lat: number,
  lon: number,
  cityHint?: string // Optional city filter like 'Noida'
): PostalPoint & { distance: number } | null {
  let nearest: PostalPoint | null = null;
  let minDistance = Infinity;

  let data = postalData as PostalPoint[];

  // Apply city hint filter
  if (cityHint) {
    const cityLower = cityHint.toLowerCase();
    data = data.filter((point) =>
      point.place.toLowerCase().includes(cityLower)
    );
  }

  for (const point of data) {
    const dist = getDistance(lat, lon, point.lat, point.lon);

    if (dist < minDistance) {
      minDistance = dist;
      nearest = point;
    }
  }

  if (!nearest) return null;

  return {
    ...nearest,
    distance: parseFloat(minDistance.toFixed(3)),
  };
}