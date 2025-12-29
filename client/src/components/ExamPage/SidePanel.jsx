import WebcamMonitor from "../WebcamMonitor";

export default function SidePanel({ webcamRef, violations }) {
  return (
    <div className="w-72 space-y-4">
      
      {/* Webcam */}
      <div className="bg-white rounded shadow p-2">
        <p className="text-sm font-semibold mb-1">Webcam</p>
        <WebcamMonitor webcamRef={webcamRef} />
      </div>

      {/* Violation */}
      <div className="bg-white rounded shadow p-4">
        <p className="text-sm font-semibold">Pelanggaran</p>
        <p className="text-red-600 text-lg font-bold">
          {violations} / 9
        </p>
      </div>

      {/* Question Navigator */}
      <div className="bg-white rounded shadow p-4">
        <p className="text-sm font-semibold mb-2">Navigasi Soal</p>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <button
              key={i}
              className="border rounded text-sm py-1 hover:bg-blue-600 hover:text-white"
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
