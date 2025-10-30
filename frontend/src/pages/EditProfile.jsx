import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/empty_dp.png";

const EditProfile = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  return (
    <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] ">
      <div className="w-full h-[80px] flex items-center gap-[20px] px-[10px]">
        <MdOutlineKeyboardBackspace
          className="text-white cursor-pointer w-[25px] h-[25px]"
          onClick={() => navigate(`/profile/${userData.userName}`)}
        />
        <h1 className="text-white font-semibold text-[20px]">Edit Profile</h1>
      </div>

      <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden ">
        <img
          src={userData?.profileImage || dp}
          alt="profile image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-blue-500 text-center text-[18px]">
        Change your profile picture
      </div>
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Enter Your Name"
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Enter Your userName"
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Bio"
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Profession"
      />
      <input
        type="text"
        className="w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] text-white font-semibold border-2 border-gray-700 rounded-2xl px-[20px] outline-none"
        placeholder="Gender"
      />

      <button className="px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] cursor-pointer rounded-2xl">
        Save Profile
      </button>
    </div>
  );
};

export default EditProfile;
