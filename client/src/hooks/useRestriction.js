// hooks/useRestriction.js
import { useEffect } from "react";

export function useRestriction({
  enabled,
  onViolation,
  allowPrintScreen = false,
}) {
  useEffect(() => {
    if (!enabled) return;

    /* =============================
       TAB & FOCUS GUARD
    ============================== */
    const onBlur = () => {
      onViolation("Gak usah aneh2");
    };

    const onVisibility = () => {
      if (document.hidden) {
        onViolation("Gak usah aneh2");
      }
    };

    /* =============================
       COPY / PASTE / CUT
    ============================== */
    const blockClipboard = (e) => {
      e.preventDefault();
      onViolation("Gak usah aneh2");
    };

    /* =============================
       SCREENSHOT (BEST EFFORT)
    ============================== */
    const onKey = (e) => {
      if (!allowPrintScreen && e.key === "PrintScreen") {
        onViolation("Gak usah aneh2");
      }

      // Shortcut umum
      if (e.ctrlKey || e.metaKey) {
        const forbidden = ["c", "v", "x", "a", "s", "p"];
        if (forbidden.includes(e.key.toLowerCase())) {
          e.preventDefault();
          onViolation("Gak usah aneh2");
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
