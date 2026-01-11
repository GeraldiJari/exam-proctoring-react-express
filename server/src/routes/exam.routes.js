import { Router } from "express";
import multer from "multer";
import {
  uploadScreenshot,
  getExamById,
} from "../controllers/exam.controller.js";

const router = Router();

router.get("/:id", getExamById);

const storage = multer.diskStorage({
  destination: "src/uploads/screenshots",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post(
  "/:examId/screenshots",
  upload.single("screenshot"),
  uploadScreenshot
);

export default router;
