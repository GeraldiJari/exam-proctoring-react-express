import {
  joinExam,
  leaveExam,
  saveViolation,
  saveAdminCommand,
} from "../services/exam.service.js";

// IN-MEMORY STATE
const examUsers = new Map();
/**
 * examUsers:
 * examId -> Map(userId -> { socketId, violations })
 */

export const registerExamSocket = (io, socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("JOIN_EXAM", async ({ examId, userId }) => {
    if (!examUsers.has(examId)) {
      examUsers.set(examId, new Map());
    }

    examUsers.get(examId).set(userId, {
      socketId: socket.id,
      violations: 0,
    });

    await joinExam({ examId, userId });

    socket.join(`exam:${examId}`);

    io.to(`exam:${examId}`).emit("USER_JOINED", {
      examId,
      userId,
    });
  });

  socket.on("VIOLATION", async ({ examId, userId, type }) => {
    const exam = examUsers.get(examId);
    if (!exam || !exam.has(userId)) return;

    const user = exam.get(userId);
    user.violations += 1;

    await saveViolation({ examId, userId, type });

    io.to(`exam:${examId}`).emit("VIOLATION_EVENT", {
      examId,
      userId,
      type,
      total: user.violations,
      time: new Date().toISOString(),
    });
  });

  socket.on("ADMIN_COMMAND", async (data) => {
    const { examId, userId, command, message } = data;

    const exam = examUsers.get(examId);
    if (!exam || !exam.has(userId)) return;

    await saveAdminCommand({
      examId,
      userId,
      command,
      message,
    });

    io.to(exam.get(userId).socketId).emit(
      "CLIENT_COMMAND",
      data
    );
  });

  socket.on("disconnect", async () => {
    for (const [examId, users] of examUsers.entries()) {
      for (const [userId, user] of users.entries()) {
        if (user.socketId === socket.id) {
          users.delete(userId);

          await leaveExam({ examId, userId });

          io.to(`exam:${examId}`).emit("USER_LEFT", {
            examId,
            userId,
          });
        }
      }
    }

    console.log("Socket disconnected:", socket.id);
  });
};
