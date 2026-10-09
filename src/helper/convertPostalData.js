import fs from "fs";
import path from "path";

const inputPath = path.resolve(process.cwd(), 'src/test/IN.txt');
const outputPath = path.resolve(process.cwd(), 'src/test/in-postal.json');

if (!fs.existsSync(inputPath)) {
  console.error('❌ IN.txt not found at:', inputPath);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, 'utf8');
const lines = raw.trim().split('\n');

const cleanedData = lines.map((line, index) => {
  const parts = line.split('\t');

  if (parts.length < 11) {
    console.warn(`⚠️ Skipping invalid line ${index + 1}: not enough columns`);
    return null;
  }

  const postalCode = parts[1];
  const place = parts[2];
  const lat = parseFloat(parts[9]);
  const lon = parseFloat(parts[10]);

  // Basic validation
  if (isNaN(lat) || isNaN(lon) || lat > 90 || lat < -90 || lon > 180 || lon < -180) {
    console.warn(`❌ Skipping line ${index + 1} due to invalid lat/lon: ${lat}, ${lon}`);
    return null;
  }

  return {
    postalCode,
    place,
    lat,
    lon,
  };
}).filter(Boolean); // Remove null entries

fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2));

console.log(`✅ Cleaned postal data written to ${outputPath}`);
