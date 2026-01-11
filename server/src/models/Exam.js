import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startTime: Date,
    endTime: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Exam", examSchema);
