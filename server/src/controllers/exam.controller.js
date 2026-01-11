import fs from "fs";
import Exam from "../models/Exam.js";

const uploadDir = "src/uploads/screenshots";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: "Invalid exam id" });
  }
};

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
