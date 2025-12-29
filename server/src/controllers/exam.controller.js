import path from "path";
import fs from "fs";

// pastikan folder upload ada
const uploadDir = "src/uploads/screenshots";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const uploadScreenshot = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "Screenshot uploaded",
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
    },
  });
};
