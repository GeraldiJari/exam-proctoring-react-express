export default function StartExamScreen({ onStart }) {
  return (
    <div className="w-full flex items-center justify-center bg-white">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">
          Ujian Akhir
        </h1>
        <p className="text-gray-600 mb-6">
          Pastikan koneksi stabil, kamera aktif, dan fullscreen tidak ditutup.
        </p>

        <ul className="text-left text-sm text-gray-700 mb-6 space-y-2">
          <li>Fullscreen wajib</li>
          <li>Webcam harus aktif</li>
          <li>Pindah tab = pelanggaran</li>
        </ul>

        <button
          onClick={() => {
            console.log("START BUTTON CLICKED");
            onStart();
          }}
        >
          Mulai Ujian
        </button>
      </div>
    </div>
  );
}
