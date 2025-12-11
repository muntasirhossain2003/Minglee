import { useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import dp from "../assets/empty_dp.png";
import FollowButton from "./FollowButton";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useSelector } from "react-redux";
import { MdOutlineComment } from "react-icons/md";


function LoopCard({ loop }) {
  const navigate = useNavigate();
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(true);
  const [progress, setProgress] = useState(0);
  const {userData} = useSelector((state) => state.user);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };
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
        onTimeUpdate={handleTimeUpdate}
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

      {/* progress */}
      <div className="absolute bottom-0 w-full h-[4px] bg-gray-900">
        <div
          className="w-[200px] h-full bg-white transition-all duration-200 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="w-full absolute h-[100px] bottom-[10px] px-[10px] flex flex-col gap-[10px]">
        <div className="flex  items-center gap-[5px] ">
          <div
            className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
            onClick={() => navigate(`/profile/${post.author.userName}`)}
          >
            <img
              src={loop.author?.profileImage || dp}
              alt="profile image"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="w-[120px] font-semibold truncate cursor-pointer text-white "
            onClick={() => navigate(`/profile/${loop.author.userName}`)}
          >
            {loop.author.userName}
          </div>
          <FollowButton
            targetUserId={loop.author?._id}
            tailwind={
              "px-[10px] py-[5px] cursor-pointer text-white border-2 text-[14px] rounded-2xl border-white"
            }
          />
        </div>
        <div className="text-white px-[10px]">{loop.caption}</div>
        <div className="absolute right-0 flex flex-col gap-[20px] text-white bottom-[150px] justify-center px-[10px]">
          <div className="flex flex-col items-center cursor-pointer">
            <div>
              {!loop.likes.includes(userData._id) && (
                <GoHeart className="w-[25px] cursor-pointer h-[25px]" />
              )}
              {loop.likes.includes(userData._id) && (
                <GoHeartFill className="w-[25px] cursor-pointer h-[25px] text-red-600" />
              )}
            </div>
            <div>{loop.likes.length}</div>
          </div>
          <div className="flex flex-col items-center cursor-pointer">
            <div><MdOutlineComment className="w-[25px] cursor-pointer h-[25px]"/></div>
            <div>{loop.comments.length}</div>
            {/* 1.20 */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoopCard;
