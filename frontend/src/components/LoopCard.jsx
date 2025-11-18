import { useRef } from "react";

function LoopCard({ loop }) {
  const videoRef = useRef();
  return (
    <div className="w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative">
      <video ref={videoRef} src={loop.media} autoPlay loop className="w-full max-h-full"/>
    </div>
  );
}

export default LoopCard;
