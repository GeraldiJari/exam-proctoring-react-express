export default function ExamHeader({ title, userName, time, onExitFullscreen }) {
  return (
    <div className="h-16 bg-gray-900 text-white flex items-center justify-between px-6">
      <h1 className="font-semibold tracking-wide">{title} || {userName}</h1>

      <div className="flex items-center gap-4">
        <span className="font-mono text-sm">⏱ {time}</span>

        <button
          onClick={onExitFullscreen}
          className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700"
        >
          Fullscreen Ulang
        </button>
      </div>
    </div>
  );
}
