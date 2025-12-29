export default function OptionItem({ text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 border rounded
        ${selected ? "bg-blue-100 border-blue-500" : ""}
      `}
    >
      {text}
    </button>
  );
}
