import { useRef, useState, useEffect } from "react";
import StartExamScreen from "../components/StartScreen";
import ExamHeader from "../components/ExamPage/ExamHeader";
import SidePanel from "../components/ExamPage/SidePanel";
import ViolationModal from "../components/ViolationModal";
import { useRestriction } from "../hooks/useRestriction";
import { useFullscreen } from "../hooks/useFullscreen";
import { useScreenCaptureDemo } from "../hooks/useScreenGuard";
import ScreenshotPreviewModal from "../components/PreviewScreenShoot";
import { uploadExamScreenshot } from "../services/examApi";
import { socket } from "../socket";

export default function ExamPage() {
  const webcamRef = useRef(null);
  const screenshotsRef = useRef([]);

  const EXAM_ID = 123;
  const USER_ID = "A001";

  const MAX_VIOLATIONS = 9;

  const [started, setStarted] = useState(false);
  const [examReady, setExamReady] = useState(false);
  const [violationMsg, setViolationMsg] = useState(null);
  const [violations, setViolations] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);

  /* ================= SOCKET LIFECYCLE ================= */

  useEffect(() => {
    socket.connect();
    console.log("Socket connected (client)");

    return () => {
      socket.disconnect();
      console.log("Socket disconnected (client)");
    };
  }, []);

  useEffect(() => {
    if (!examReady) return;

    console.log("EMIT JOIN_EXAM");

    socket.emit("JOIN_EXAM", {
      examId: EXAM_ID,
      userId: USER_ID,
    });
  }, [examReady]);

  /* ================= SCREEN CAPTURE ================= */

  const { startShare } = useScreenCaptureDemo({
    enabled: examReady && !submitted,
    interval: 30000,
    onCapture: async (blob) => {
      screenshotsRef.current.push({
        time: new Date().toLocaleTimeString(),
        blob,
      });

      try {
        await uploadExamScreenshot(EXAM_ID, blob);
        console.log("Screenshot uploaded");
      } catch (err) {
        console.error("Upload failed", err);
      }
    },
  });

  /* ================= VIOLATION ================= */

  const handleViolation = (msg) => {
    console.log("EMIT VIOLATION:", msg);

    socket.emit("VIOLATION", {
      examId: EXAM_ID,
      userId: USER_ID,
      type: msg,
    });

    setViolations((prev) => {
      const next = prev + 1;

      if (next >= MAX_VIOLATIONS) {
        setSubmitted(true);
        setViolationMsg(
          "Ujian otomatis diselesaikan karena terlalu banyak pelanggaran."
        );
      } else {
        setViolationMsg(msg);
      }

      return next;
    });
  };

  const { enterFullscreen } = useFullscreen(() =>
    handleViolation("FULLSCREEN_EXIT")
  );

  useRestriction({
    enabled: examReady && !submitted,
    onViolation: handleViolation,
  });

  /* ================= START EXAM ================= */

  const startExam = async () => {
    console.log("START EXAM CLICKED");

    const screenOk = await startShare();
    console.log("SCREEN SHARE RESULT:", screenOk);

    if (!screenOk) {
      console.warn("STOP: screen share gagal / ditolak");
      return;
    }

    const fsOk = await enterFullscreen();
    console.log("FULLSCREEN RESULT:", fsOk);

    if (!fsOk) {
      console.warn("STOP: fullscreen gagal");
      return;
    }

    console.log("EXAM READY = TRUE");
    setStarted(true);
    setExamReady(true);
  };



  /* ================= UI ================= */

  if (!started) {
    return <StartExamScreen onStart={startExam} />;
  }

  if (submitted) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="bg-gray-800 p-8 rounded-xl text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            Ujian Dihentikan
          </h2>
          <p className="mb-4 text-gray-300">
            Terlalu banyak pelanggaran.
          </p>
          <p className="text-sm text-gray-400">
            Total Pelanggaran: {violations}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-white">
      <ExamHeader title="YEEEY" time="0" />

      <button
        onClick={() => setShowScreenshots(true)}
        className="fixed bottom-6 left-6 bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        Lihat Screenshot
      </button>

      <ScreenshotPreviewModal
        open={showScreenshots}
        screenshots={screenshotsRef.current}
        onClose={() => setShowScreenshots(false)}
      />

      <div className="flex overflow-hidden">
        <SidePanel webcamRef={webcamRef} violations={violations} />
      </div>

      <ViolationModal
        open={!!violationMsg}
        message={violationMsg}
        onFix={() => {
          enterFullscreen();
          setViolationMsg(null);
        }}
      />
    </div>
  );
}
