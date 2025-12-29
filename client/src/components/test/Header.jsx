export default function Header({ timeLeft, violations }) {
  return (
    <div className="flex justify-between items-center p-4 border-b bg-white">
      <div className="font-semibold">Ujian Online</div>

      <div className="flex gap-6 text-sm">
        <span>⏱️ {timeLeft}</span>
        <span className="text-red-600">
          ⚠️ Pelanggaran: {violations}/3
        </span>
      </div>
    </div>
  );
}
