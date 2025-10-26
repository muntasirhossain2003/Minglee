import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import dp from "../assets/empty_dp.png";
import logo from "../assets/icon.png";
import { setUserData } from "../redux/userSlice";
const LeftHome = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });

      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-[black] border-r-2 border-gray-900">
      {/* logo and notification icon */}
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img src={logo} alt="logo" className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>

      {/* profile image and profile name */}

      <div className="flex items-center w-full justify-between gap-[10px] p-[10px] ">
        <div className="flex items-center gap-[10px]">
          {/* profile pic */}
          <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img
              src={userData.profileImage || dp}
              alt="profile image"
              className="w-full h-full object-cover"
            />
          </div>
          {/* name and user name */}
          <div>
            <div className="text-[18px] text-white font-semibold">
              {userData.userName}
            </div>
            <div className="text-[15px] text-gray-400 font-semibold">
              {userData.name}
            </div>
          </div>
        </div>
        <div
          className="text-blue-500 font-semibold cursor-pointer"
          onClick={handleLogOut}
        >
          Log Out
        </div>
      </div>
    </div>
  );
};

export default LeftHome;
