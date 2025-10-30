import { FiPlusSquare, FiSearch } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { RxVideo } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/empty_dp.png";

function Nav() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const handleProfileClick = () => {
    if (userData?.userName) {
      navigate(`/profile/${userData.userName}`);
    } else {
      // user data not ready yet — avoid throwing when clicking
      console.warn("User data not loaded yet");
    }
  };
  return (
    <div className="w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]">
      <div onClick={() => navigate("/")}>
        <GoHomeFill className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiSearch className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <FiPlusSquare className="text-white w-[25px] h-[25px]" />
      </div>
      <div>
        <RxVideo className="text-white w-[28px] h-[28px]" />
      </div>
      <div
        className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
        onClick={handleProfileClick}
      >
        <img
          src={userData?.profileImage || dp}
          alt="profile image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Nav;
