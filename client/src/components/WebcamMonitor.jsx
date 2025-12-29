// components/WebcamMonitor.jsx
import Webcam from "react-webcam";

export default function WebcamMonitor({ webcamRef }) {
  return (
    <div className="fixed bottom-4 right-4 w-40 border">
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
      />
    </div>
  );
}
