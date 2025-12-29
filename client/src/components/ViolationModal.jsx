export default function ViolationModal({ open, message, onFix }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-xl p-6">
        <h2 className="text-lg font-bold text-red-600 mb-2">
          Pelanggaran Terdeteksi
        </h2>

        <p className="text-gray-700 mb-6">
          {message}
        </p>

        <button
          onClick={onFix}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Kembali ke Fullscreen
        </button>
      </div>
    </div>
  );
}
