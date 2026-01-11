import ExamParticipant from "../models/ExamParticipant.js";
import ExamViolation from "../models/ExamViolation.js";
import AdminCommand from "../models/AdminCommand.js";

export const joinExam = async ({ examId, userId }) => {
  return ExamParticipant.create({
    examId,
    userId,
  });
};

export const leaveExam = async ({ examId, userId }) => {
  return ExamParticipant.findOneAndUpdate(
    { examId, userId, leftAt: null },
    { leftAt: new Date() }
  );
};

export const saveViolation = async ({ examId, userId, type }) => {
  return ExamViolation.create({
    examId,
    userId,
    type,
  });
};

export const saveAdminCommand = async ({
  examId,
  userId,
  command,
  message,
}) => {
  return AdminCommand.create({
    examId,
    userId,
    command,
    message,
  });
};
