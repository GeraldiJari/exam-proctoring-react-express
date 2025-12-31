import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";

const PORT = 3000;

// bikin http server
const server = http.createServer(app);

// pasang socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// IN-MEMORY STATE (sementara)
const examUsers = new Map();

/**
 * examUsers:
 * examId -> Map(userId -> { socketId, violations })
 */

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("JOIN_EXAM", (data) => {
    console.log("JOIN_EXAM RECEIVED:", data);

    if (!examUsers.has(data.examId)) {
      examUsers.set(data.examId, new Map());
    }

    examUsers.get(data.examId).set(data.userId, {
      socketId: socket.id,
      violations: 0,
    });

    io.emit("USER_JOINED", data);
  });

  socket.on("VIOLATION", (data) => {
    console.log("VIOLATION RECEIVED:", data);

    const exam = examUsers.get(data.examId);
    if (!exam) return;

    const user = exam.get(data.userId);
    if (!user) return;

    user.violations++;

    io.emit("VIOLATION_EVENT", {
      ...data,
      total: user.violations,
      time: new Date().toISOString(),
    });
  });


  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);

    for (const [examId, users] of examUsers) {
      for (const [userId, data] of users) {
        if (data.socketId === socket.id) {
          users.delete(userId);
          io.emit("USER_LEFT", { examId, userId });
        }
      }
    }
  });

  socket.on("ADMIN_COMMAND", (data) => {
    console.log("ADMIN_COMMAND:", data);

    const { examId, userId } = data;

    const exam = examUsers.get(examId);
    if (!exam) return;

    const user = exam.get(userId);
    if (!user) return;

    // kirim command ke peserta tertentu
    io.to(user.socketId).emit("CLIENT_COMMAND", data);
  });

});

// START SERVER
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
