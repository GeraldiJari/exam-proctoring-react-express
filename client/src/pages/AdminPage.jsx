import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const MESSAGE_TEMPLATES = [
    "Harap kembali ke fullscreen.",
    "Aktivitas mencurigakan terdeteksi.",
    "Ini peringatan terakhir.",
  ];
  const [message, setMessage] = useState("");

  const sendCommand = (userId, command, customMessage = "") => {
    socket.emit("ADMIN_COMMAND", {
      examId: "695a57ccef7cf7ac7d9b2f23",
      userId: "695a579eef7cf7ac7d9b2f1d",
      command,
      message: customMessage,
      duration: 30000,
    });

    setLogs((prev) => [
      `[ADMIN] Sent ${command} to ${userId}`,
      ...prev,
    ]);
  };



  useEffect(() => {
    // connect socket (reuse singleton)
    if (!socket.connected) {
      socket.connect();
    }

    // user join
    socket.on("USER_JOINED", ({ examId, userId }) => {
      setUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );

      setLogs((prev) => [
        `[JOIN] User ${userId} joined exam ${examId}`,
        ...prev,
      ]);
    });

    // violation event
    socket.on("VIOLATION_EVENT", (data) => {
      setLogs((prev) => [
        `[VIOLATION] ${data.userId} - ${data.type} (total: ${data.total})`,
        ...prev,
      ]);
    });

    // user left
    socket.on("USER_LEFT", ({ examId, userId }) => {
      setUsers((prev) => prev.filter((u) => u !== userId));

      setLogs((prev) => [
        `[LEFT] User ${userId} left exam ${examId}`,
        ...prev,
      ]);
    });

    return () => {
      socket.off("USER_JOINED");
      socket.off("VIOLATION_EVENT");
      socket.off("USER_LEFT");
    };
  }, []);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">
        Admin Live Dashboard (DEV)
      </h1>

      {/* Online Users */}
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Online Users</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">No active users</p>
      ) : (
        users.map((u) => (
          <div
            key={u}
            className="border rounded p-3 mb-3 bg-gray-800"
          >
            User : 
            <strong> {u}</strong>

            {/* Template buttons */}
            <div className="flex gap-2 mt-2 flex-wrap">
              {MESSAGE_TEMPLATES.map((tpl, idx) => (
                <button
                  key={idx}
                  onClick={() => sendCommand(u, "MESSAGE", tpl)}
                  className="px-2 py-1 bg-indigo-500 text-black rounded text-sm"
                >
                  {tpl}
                </button>
              ))}
            </div>

            {/* Custom message */}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Custom message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border px-2 py-1 flex-1 rounded"
              />
              <button
                onClick={() => {
                  sendCommand(u, "MESSAGE", message);
                  setMessage("");
                }}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Send
              </button>
            </div>

            {/* Lock */}
            <button
              onClick={() =>
                sendCommand(u, "LOCK", "Ujian dikunci sementara")
              }
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
            >
              Lock 30s
            </button>
          </div>
        ))
      )}
    </div>


      {/* Logs */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Live Logs</h2>
        <div
          className="bg-black text-green-400 p-3 rounded h-64 overflow-auto text-sm font-mono"
        >
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
