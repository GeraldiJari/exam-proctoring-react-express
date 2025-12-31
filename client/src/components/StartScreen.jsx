export default function StartExamScreen({ 
  onStart, 
  cameraRequired = true, 
  cameraStatus = null,
  lastViolation = null 
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Smart Anti-Cheat Exam
          </h1>
          <p className="text-gray-600">
            Pastikan koneksi stabil, kamera aktif, dan fullscreen tidak ditutup.
          </p>
        </div>

        {cameraRequired && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <p className="text-sm text-red-900 font-semibold mb-2">
                  WAJIB: Akses Kamera Harus Diizinkan
                </p>
                <p className="text-sm text-red-800">
                  Sistem akan meminta izin akses kamera untuk pengawasan tes.
                </p>
                <p className="text-sm text-red-800 font-bold mt-2">
                  Jika Anda menolak akses kamera, tes TIDAK DAPAT DIMULAI dan akan dicatat sebagai pelanggaran berat.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Status notification */}
        {lastViolation && (
          <div 
            className={`mb-6 p-4 rounded-lg border-l-4 ${
              lastViolation.level === 'ERROR' 
                ? 'bg-red-50 border-red-500' 
                : lastViolation.level === 'SUCCESS'
                ? 'bg-green-50 border-green-500'
                : 'bg-blue-50 border-blue-500'
            }`}
          >
            <p className="font-semibold text-sm mb-1">
              {lastViolation.level}
            </p>
            <p className="text-sm">
              {lastViolation.reason}
            </p>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Peraturan Ujian:</h2>
          <ul className="text-sm text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">✓</span>
              <span><strong>Fullscreen wajib</strong> - Sistem akan memaksa mode fullscreen</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">✓</span>
              <span><strong>Webcam harus aktif</strong> - Kamera akan merekam selama ujian</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">✗</span>
              <span><strong>Jangan pindah tab/window</strong> - Akan tercatat sebagai pelanggaran</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">✗</span>
              <span><strong>Jangan buka DevTools</strong> - Akses developer tools dilarang</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">✗</span>
              <span><strong>Jangan copy/paste</strong> - Semua konten dilindungi</span>
            </li>
          </ul>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4 mb-6 border border-yellow-300">
          <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
            <span>⚖️</span>
            <span>Sistem Sanksi Progresif:</span>
          </h3>
          <div className="text-sm text-yellow-800 space-y-1">
            <p>• <strong>Pelanggaran Ringan:</strong> Peringatan saja (blur singkat &lt;800ms)</p>
            <p>• <strong>Pelanggaran Sedang:</strong> +1 poin, lock 5-10 detik</p>
            <p>• <strong>Pelanggaran Berat:</strong> +2 poin, dapat menyebabkan auto-submit</p>
            <p className="mt-2 font-bold text-red-700">• Maksimal 5 pelanggaran → Ujian otomatis disubmit</p>
          </div>
        </div>

        <button
          onClick={onStart}
          disabled={cameraStatus === 'requesting'}
          className={`w-full py-4 rounded-lg font-semibold transition text-lg ${
            cameraStatus === 'requesting'
              ? 'bg-gray-400 cursor-not-allowed text-gray-600'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {cameraStatus === 'requesting' 
            ? '⏳ Menunggu Izin Kamera...' 
            : '🎥 Mulai Ujian (Aktifkan Kamera + Fullscreen)'}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Dengan mengklik tombol di atas, Anda menyetujui untuk diawasi selama ujian
        </p>
      </div>
    </div>
  );
}
