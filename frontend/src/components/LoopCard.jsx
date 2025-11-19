import { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

function LoopCard({ loop }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const handleClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  return (
    <div className="w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative">
      <video
        ref={videoRef}
        src={loop.media}
        autoPlay
        muted={isMute}
        loop
        className="w-full max-h-full"
        onClick={handleClick}
      />
      <div
        className="absolute top-[20px] z-[100] right-[20px]"
        onClick={() => setIsMute((prev) => !prev)}
      >
        {!isMute ? (
          <FiVolume2 className="w-[20px] h-[20px] text-white font-semibold " />
        ) : (
          <FiVolumeX className="w-[20px] h-[20px] text-white font-semibold " />
        )}
      </div>
    </div>
  );
}

export default LoopCard;
