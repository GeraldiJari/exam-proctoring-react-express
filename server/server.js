import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import { registerExamSocket } from "./src/socket/exam.socket.js";
import { connectDB } from "./src/db/index.js";

connectDB();

const PORT = 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  registerExamSocket(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
