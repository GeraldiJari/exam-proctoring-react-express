import express from "express";
import cors from "cors";
import examRoutes from "./routes/exam.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/exams/", examRoutes);

app.use("/api/users", userRoutes);

export default app;
