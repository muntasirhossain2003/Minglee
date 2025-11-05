import axios from "axios";
import { useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import dp from "../assets/empty_dp.png";
import FollowButton from "../components/FollowButton";
import Nav from "../components/Nav";
import { setProfileData, setUserData } from "../redux/userSlice";

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);
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
    if (!userName) return; // avoid calling API with undefined username
    handleProfile();
  }, [userName, dispatch]);
  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-[80px] flex justify-between items-center px-[30px]  text-white">
        {/* backicon */}
        <div onClick={() => navigate("/")}>
          <MdOutlineKeyboardBackspace className="text-white cursor-pointer w-[25px] h-[25px]" />
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
      {/* profile info and posts will go here */}
      <div className="w-full h-[150] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImage || dp}
            alt="profile image"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-[22px] text-white">
            {profileData?.name}
          </div>
          <div className="font-semibold text-[17px] text-[#ffffffe8]">
            {profileData?.profession || "New User"}
          </div>
          <div className="font-semibold text-[17px] text-[#ffffffe8]">
            {profileData?.bio}
          </div>
        </div>
      </div>
      {/* followers and following section */}
      <div className="w-full h-[100px] flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[30px] text-white">
        {/* posts */}
        <div>
          <div className="text-white text-[20px] md:text-[30px] font-semibold">
            {profileData?.posts?.length}
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Post
          </div>
        </div>
        {/* followers */}
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              {profileData?.followers?.slice(0, 3).map((user, index) => (
                <div
                  key={user._id || index}
                  className={`w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${
                    index > 0 ? " absolute left-[${index*9}]" : ""
                  }`}
                >
                  <img
                    src={user?.profileImage || dp}
                    alt="profile image"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="text-white text-[20px] md:text-[30px] font-semibold">
              {profileData?.followers?.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Followers
          </div>
        </div>
        {/* following */}
        <div>
          <div className="flex items-center justify-center gap-[20px]">
            <div className="flex relative">
              <div className="w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img
                  src={profileData?.profileImage || dp}
                  alt="profile image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[40px] h-[40px] absolute border-2 border-black rounded-full cursor-pointer overflow-hidden left-[9px]">
                <img
                  src={profileData?.profileImage || dp}
                  alt="profile image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-[40px] h-[40px] absolute border-2 border-black rounded-full cursor-pointer overflow-hidden left-[18px]">
                <img
                  src={profileData?.profileImage || dp}
                  alt="profile image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-white text-[20px] md:text-[30px] font-semibold">
              {profileData?.following?.length}
            </div>
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center gap-[20px] mt-[15px]">
        {/* buttons for follow/unfollow or edit profile can go here */}
        {profileData?._id == userData?._id && (
          <button
            className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        )}
        {profileData?._id != userData?._id && (
          <>
            <FollowButton
              tailwind={
                "px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl"
              }
              targetUserId={profileData?._id}
              onFollowChange = {handleProfile}
            />
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl">
              Message
            </button>
          </>
        )}
      </div>
      <div className="w-full min-h-[100vh] flex justify-center mt-[15px]">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Profile;
