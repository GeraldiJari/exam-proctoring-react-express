// hooks/useFullscreen.js
import { useEffect } from "react";

export function useFullscreen(onExit) {
  const enterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const onChange = () => {
      if (!document.fullscreenElement) {
        onExit?.();
      }
    };

    document.addEventListener("fullscreenchange", onChange);

    return () => {
      document.removeEventListener("fullscreenchange", onChange);
    };
  }, [onExit]);

  return { enterFullscreen };
}
