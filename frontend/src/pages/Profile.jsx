import axios from "axios";
import { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.user);
  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      // backend returns { user }
      dispatch(setProfileData(result.data.user));
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-[80px] flex justify-between items-center px-[30px]  text-white">
        {/* backicon */}
        <div>
          <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px]" />
        </div>
        {/* userName */}
        <div className="font-semibold text-[20px]">{profileData?.userName}</div>
        {/* logOut */}
        <div
          className="font-semibold cursor-pointer text-[20px] text-blue-500"
          onClick={handleLogOut}
        >
          Log Out
        </div>
      </div>
      <div>
        {/* profile info and posts will go here */}
      </div>
    </div>
  );
};

export default Profile;
