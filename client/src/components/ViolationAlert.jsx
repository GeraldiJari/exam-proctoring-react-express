import { useEffect } from "react";

export default function ViolationToast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-4 py-3 rounded shadow-lg animate-slide-in">
      ⚠️ {message}
    </div>
  );
}
