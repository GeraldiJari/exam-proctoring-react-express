export default function Footer({ onPrev, onNext, onSubmit, isLast }) {
  return (
    <div className="flex justify-between p-4 border-t bg-white">
      <button onClick={onPrev}>Sebelumnya</button>

      {isLast ? (
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Selesai
        </button>
      ) : (
        <button onClick={onNext}>Berikutnya</button>
      )}
    </div>
  );
}
