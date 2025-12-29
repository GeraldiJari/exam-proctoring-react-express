export default function QuestionPanel() {
  return (
    <div className="flex-1 bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-4">
        Soal 1
      </h2>

      <p className="mb-6">
        Manakah pernyataan berikut yang benar mengenai React?
      </p>

      <div className="space-y-3">
        {["A", "B", "C", "D"].map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50"
          >
            <input type="radio" name="answer" />
            <span>Jawaban {opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
