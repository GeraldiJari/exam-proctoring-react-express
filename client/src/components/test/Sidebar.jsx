export default function Sidebar({ questions, current, answers, onSelect }) {
  return (
    <div className="w-48 border-r p-4 space-y-2">
      {questions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-full py-2 text-sm rounded
            ${i === current ? "bg-blue-600 text-white" : ""}
            ${answers[i] ? "border border-green-500" : ""}
          `}
        >
          Soal {i + 1}
        </button>
      ))}
    </div>
  );
}
