import path from "path";
import fs from "fs";

const srcDir = path.join(process.cwd(), "content", "projects");
const destDir = path.join(process.cwd(), "public", "images", "projects");

/**
 * Clears out empty or non-empty directory dir
 */
function clearDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

/**
 * Recursively copies image files from srcPath to destPath
 */
function copyImages(srcPath, destPath) {
  const items = fs.readdirSync(srcPath);

  for (const item of items) {
    const itemPath = path.join(srcPath, item);
    const destItemPath = path.join(destPath, item);

    if (fs.statSync(itemPath).isDirectory()) {
      // If it's a directory, recursively copy its contents
      fs.mkdirSync(destItemPath, { recursive: true });
      copyImages(itemPath, destItemPath);
    } else if (isImageFile(item)) {
      // If it's an image file, copy it to the destination folder
      fs.copyFileSync(itemPath, destItemPath);
    }
  }
}

/**
 * Check if a file has an image extension
 */
function isImageFile(filename) {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

console.log(`Copying images from '${srcDir}' to '${destDir}'...`);
copyImages(srcDir, destDir);
console.log("Finished copying images!");
