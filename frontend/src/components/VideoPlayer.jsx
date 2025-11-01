import { useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useState } from "react";

function VideoPlayer({ media }) {
  const videoTag = useRef();
  const [mute, setMute] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const handleClick = () => {
    if (isPlaying) {
      videoTag.current.pause();
      setIsPlaying(false);
    } else {
      videoTag.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden">
      <video
        ref={videoTag}
        src={media}
        autoPlay
        loop
        muted={mute}
        className="h-[100%] cursor-pointer w-full rounded-2xl object-cover"
        onClick={handleClick}
      />
      <div className="absolute bottom-[10px] right-[10px]" onClick={() => setMute((prev) => !prev)}>
        {!mute ? <FiVolume2 className="w-[20px] h-[20px] text-white font-semibold "/> : <FiVolumeX className="w-[20px] h-[20px] text-white font-semibold "/>}
      </div>
    </div>
  );
}

export default VideoPlayer;
