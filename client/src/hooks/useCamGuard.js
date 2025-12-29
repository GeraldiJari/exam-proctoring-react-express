// hooks/useWebcamGuard.js
import { useEffect } from "react";

export function useWebcamGuard({ webcamRef, enabled, onViolation }) {
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      const stream = webcamRef.current?.stream;
      const active =
        stream &&
        stream.getVideoTracks()[0]?.readyState === "live";

      if (!active) {
        onViolation("Webcam tidak aktif");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [enabled]);
}
