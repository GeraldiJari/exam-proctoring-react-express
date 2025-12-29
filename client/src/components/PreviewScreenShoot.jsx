export default function ScreenshotPreviewModal({
  open,
  screenshots,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl max-h-[80vh] rounded-xl p-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Screenshot Monitoring (Demo)
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {screenshots.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            Belum ada screenshot
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-4 overflow-auto">
            {screenshots.map((item, i) => (
              <div key={i} className="border rounded-lg p-2">
                <img
                  src={URL.createObjectURL(item.blob)}
                  alt={`screenshot-${i}`}
                  className="rounded mb-2"
                />
                <div className="text-xs text-gray-500 text-center">
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
