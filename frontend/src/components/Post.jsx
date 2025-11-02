import dp from "../assets/empty_dp.png";
import VideoPlayer from "./VideoPlayer";

function Post({ postData }) {
  return (
    <div className="w-[90%] flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-[20px]">
      <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
        <div className="flex justify-center items-center gap-[10px] md:gap-[20px]">
          <div className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={postData.author?.profileImage || dp}
              alt="profile image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[150px] font-semibold truncate">
            {postData.author.userName}
          </div>
        </div>
        <button className="px-[10px] w-[60px] md:w-[100px] py-[5px] h-[30px] md:h-[40px] bg-[black] text-white rounded-2xl text-[14px] md:text-[16px]">
          Follow
        </button>
      </div>
      <div className="w-[90%]  flex items-center justify-center ">
        {postData.mediaType == "image" && (
          <div className="w-[90%] flex  items-center justify-center">
            <img
              src={postData.media}
              alt=""
              className="w-[80%] rounded-2xl object-cover"
            />
          </div>
        )}
        {postData.mediaType == "video" && (
          <div className="w-[80%] flex flex-col items-center justify-center ">
            <VideoPlayer media={postData.media} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
