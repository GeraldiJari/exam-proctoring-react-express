import { useEffect, useRef } from "react";

export function useScreenCaptureDemo({
  enabled,
  interval = 30000,
  onCapture,
}) {
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const startShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      videoRef.current = document.createElement("video");
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      return true;
    } catch (e) {
      console.error("Screen share denied", e);
      return false;
    }
  };

  useEffect(() => {
    if (!enabled || !streamRef.current) return;

    //konversi video ke gambar
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    timerRef.current = setInterval(() => {
      const video = videoRef.current;
      if (!video || video.videoWidth === 0) return;

      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        if (blob) onCapture?.(blob);
      }, "image/jpeg", 0.6);
    }, interval);

    return () => clearInterval(timerRef.current);
  }, [enabled]);

  return { startShare };
}

