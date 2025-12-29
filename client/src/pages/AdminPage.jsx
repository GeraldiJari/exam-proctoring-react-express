import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);

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
          <ul className="list-disc pl-6">
            {users.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
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
