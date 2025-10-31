import React from "react";
import { useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Upload = () => {
  const navigate = useNavigate();
  const [uploadType, setUploadType] = useState("post");
  return (
    <div className="w-full h-[100vh] bg-black flex flex-col items-center">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[10px]">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px]"
          onClick={() => navigate(`/`)}
        />
        <h1 className="text-white font-semibold text-[20px]">Upload Media</h1>
      </div>
      <div className="w-[90%] max-w-[600px] h-[80px] bg-white rounded-full flex justify-around items-center gap-[10px]">
        <div
          className="w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black"
          onClick={() => setUploadType("post")}
        >
          post
        </div>
        <div
          className="w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black"
          onClick={() => setUploadType("story")}
        >
          Story
        </div>
        <div
          className="w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:bg-black rounded-full hover:text-white cursor-pointer hover:shadow-2xl hover:shadow-black"
          onClick={() => setUploadType("loop")}
        >
          Loop
        </div>
      </div>
    </div>
  );
};
