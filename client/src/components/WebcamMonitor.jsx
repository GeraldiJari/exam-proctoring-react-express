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

// components/WebcamMonitor.jsx
// import { useState, useRef, useEffect } from "react";
// import Webcam from "react-webcam";

// export default function WebcamMonitor({ webcamRef }) {
//   const [position, setPosition] = useState({ x: window.innerWidth - 200, y: window.innerHeight - 200 });
//   const [isDragging, setIsDragging] = useState(false);
//   const dragRef = useRef({ startX: 0, startY: 0 });

//   const handleMouseDown = (e) => {
//     // Jangan drag jika klik pada video
//     if (e.target.tagName === 'VIDEO') return;
    
//     // Stop propagation agar tidak trigger event lain
//     e.stopPropagation();
//     e.preventDefault();
    
//     setIsDragging(true);
//     dragRef.current = {
//       startX: e.clientX - position.x,
//       startY: e.clientY - position.y
//     };
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;
    
//     e.stopPropagation();
//     e.preventDefault();
    
//     const newX = e.clientX - dragRef.current.startX;
//     const newY = e.clientY - dragRef.current.startY;
    
//     // Batasi agar tidak keluar layar
//     const maxX = window.innerWidth - 160; // 160 = w-40 (10rem)
//     const maxY = window.innerHeight - 160;
    
//     setPosition({
//       x: Math.max(0, Math.min(newX, maxX)),
//       y: Math.max(0, Math.min(newY, maxY))
//     });
//   };

//   const handleMouseUp = (e) => {
//     if (isDragging) {
//       e.stopPropagation();
//       e.preventDefault();
//     }
//     setIsDragging(false);
//   };

//   // Setup global mouse move and up listeners
//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
      
//       // Cleanup
//       return () => {
//         window.removeEventListener('mousemove', handleMouseMove);
//         window.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging, position.x, position.y]);

//   return (
//     <div 
//       className="fixed w-40 border-2 border-blue-500 rounded-lg overflow-hidden shadow-lg cursor-move bg-gray-900"
//       style={{ 
//         left: `${position.x}px`, 
//         top: `${position.y}px`,
//         zIndex: 9999,
//         userSelect: 'none',
//         pointerEvents: 'auto'
//       }}
//       onMouseDown={handleMouseDown}
//     >
//       {/* Drag Handle */}
//       <div className="bg-blue-500 text-white text-xs px-2 py-1 cursor-move flex items-center justify-between">
//         <span>📹 Webcam</span>
//         <span className="text-[10px]">⋮⋮</span>
//       </div>
      
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/jpeg"
//         className="w-full pointer-events-none"
//       />
//     </div>
//   );
// }
