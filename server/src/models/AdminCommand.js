import mongoose from "mongoose";

const adminCommandSchema = new mongoose.Schema(
  {
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    command: {
      type: String,
      enum: ["LOCK", "MESSAGE"],
      required: true,
    },
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model(
  "AdminCommand",
  adminCommandSchema
);
