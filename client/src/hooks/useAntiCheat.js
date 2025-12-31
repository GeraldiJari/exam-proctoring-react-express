// hooks/useAntiCheat.js
import { useEffect, useState } from "react";

export function useAntiCheat({ enabled, onNotify, max = 3 }) {
  const [violations, setViolations] = useState(0);
  const [locked, setLocked] = useState(false);

  const violation = (reason) => {
    setViolations((v) => {
      const next = v + 1;
      onNotify?.(reason);
      if (next >= max) setLocked(true);
      return next;
    });
  };

  useEffect(() => {
    if (!enabled) return;

    const onBlur = () => violation("Keluar dari tab ujian");
    const onVisibility = () => {
      if (document.hidden)
        violation("Tab ujian tidak aktif");
    };

    window.addEventListener("blur", onBlur);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener(
        "visibilitychange",
        onVisibility
      );
    };
  }, [enabled]);

  return { violations, locked, violation, logs };
}
