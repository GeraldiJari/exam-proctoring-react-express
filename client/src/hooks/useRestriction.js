// hooks/useRestriction.js
import { useEffect } from "react";

export function useRestriction({
  enabled,
  onViolation,
  allowPrintScreen = false,
}) {
  useEffect(() => {
    if (!enabled) return;

    const onBlur = () => {
      onViolation("Perpindahan Tab Terdeteksi");
    };

    const onVisibility = () => {
      if (document.hidden) {
        onViolation("Perpindahan Tab Terdeteksi");
      }
    };

    const blockClipboard = (e) => {
      e.preventDefault();
      onViolation("Percobaan Copy Paste Cut");
    };

    const onKey = (e) => {
      if (!allowPrintScreen && e.key === "PrintScreen") {
        onViolation("Percobaan Screenshot");
      }

      // Shortcut umum
      if (e.ctrlKey || e.metaKey) {
        const forbidden = ["c", "v", "x", "a", "s", "p"];
        if (forbidden.includes(e.key.toLowerCase())) {
          e.preventDefault();
          onViolation("Percobaan Copy Paste");
        }
      }
    };

    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("copy", blockClipboard);
    document.addEventListener("paste", blockClipboard);
    document.addEventListener("cut", blockClipboard);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("copy", blockClipboard);
      document.removeEventListener("paste", blockClipboard);
      document.removeEventListener("cut", blockClipboard);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);
}
