import OptionItem from "./OptionItem";

export default function QuestionCard({ question, answer, onAnswer }) {
  return (
    <div className="p-6">
      <h2 className="font-semibold mb-4">{question.text}</h2>

      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <OptionItem
            key={i}
            text={opt}
            selected={answer === i}
            onClick={() => onAnswer(i)}
          />
        ))}
      </div>
    </div>
  );
}
