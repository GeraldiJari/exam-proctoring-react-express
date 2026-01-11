import mongoose from "mongoose";

const examParticipantSchema = new mongoose.Schema(
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
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    leftAt: Date,
  }
);

export default mongoose.model(
  "ExamParticipant",
  examParticipantSchema
);
