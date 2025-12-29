import { Router } from "express";
import multer from "multer";
import { uploadScreenshot } from "../controllers/exam.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "src/uploads/screenshots",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post(
  "/exams/:examId/screenshots",
  upload.single("screenshot"),
  uploadScreenshot
);

export default router;
