import path from "path";
import fs from "fs";

async function saveFilesIntoDataBase(file: File, filename: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const uploadDirPath = path.join(`${process.env.SERVER_IMG_PATH}`, "images");
  if (!uploadDirPath) {
    fs.mkdirSync(uploadDirPath, { recursive: true });
  }
  const filePath = path.join(uploadDirPath, filename);
  fs.writeFileSync(filePath, buffer);
  return `/images/${filename}`;
}
export default saveFilesIntoDataBase;
