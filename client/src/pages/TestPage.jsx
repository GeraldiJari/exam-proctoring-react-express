import { useRef, useState } from "react";
import StartExamScreen from "../components/StartScreen";
import ExamHeader from "../components/ExamPage/ExamHeader";
import QuestionPanel from "../components/ExamPage/QuestionPanel";
import SidePanel from "../components/ExamPage/SidePanel";
import ViolationModal from "../components/ViolationModal";
import { useRestriction } from "../hooks/useRestriction";
import { useFullscreen } from "../hooks/useFullscreen";
import { useScreenCaptureDemo } from "../hooks/useScreenGuard";
import ScreenshotPreviewModal from "../components/PreviewScreenShoot";


export default function ExamPage() {
  const webcamRef = useRef(null);

  const MAX_VIOLATIONS = 9;

  const [started, setStarted] = useState(false);
  const [violationMsg, setViolationMsg] = useState(null);
  const [violations, setViolations] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showScreenshots, setShowScreenshots] = useState(false);


  const screenshotsRef = useRef([]);

  // useScreenCaptureDemo({
  //   enabled: started && !submitted,
  //   interval: 15000,
  //   onCapture: (blob) => {
  //     screenshotsRef.current.push({
  //       time: new Date().toLocaleTimeString(),
  //       blob,
  //     });

  //     console.log(
  //       "Screenshot captured",
  //       screenshotsRef.current.length
  //     );
  //   },
  // });


  const handleViolation = (msg) => {
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
    handleViolation("Anda keluar dari mode fullscreen")
  );

  useRestriction({
    enabled: started && !submitted,
    onViolation: handleViolation,
  });


  const startExam = async () => {
    const ok = await enterFullscreen();
    if (!ok) return;
    setStarted(true);
  };

  if (!started) {
    return <StartExamScreen onStart={startExam} />;
  }

  if (submitted) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl text-center max-w-md shadow-xl">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Ujian Dihentikan
        </h2>

        <p className="mb-6 text-gray-300">
          Ujian otomatis diselesaikan karena terlalu banyak pelanggaran.
        </p>

        <div className="text-sm text-gray-400 mb-6">
          Total Pelanggaran: {violations}
        </div>

        <button
          disabled
          className="px-6 py-2 bg-gray-600 rounded cursor-not-allowed"
        >
          Jawaban Terkirim
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* <ExamHeader
        title="Ujian Akhir Web Programming"
        time="01:30:00"
        onExitFullscreen={enterFullscreen}
      /> */}

      {/* <button
        onClick={() => setShowScreenshots(true)}
        className="fixed bottom-6 left-6 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700"
      >
        Lihat Screenshot
      </button> */}
      
      {/* <ScreenshotPreviewModal
        open={showScreenshots}
        screenshots={screenshotsRef.current}
        onClose={() => setShowScreenshots(false)}
      /> */}



      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        <QuestionPanel />
        <SidePanel webcamRef={webcamRef} violations={violations} />
      </div>

      {/* <ViolationModal
        open={!!violationMsg}
        message={violationMsg}
        onFix={() => {
          enterFullscreen();
          setViolationMsg(null);
        }}
      /> */}
    </div>
  );
}

