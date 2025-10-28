import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { setProfileData } from "../redux/userSlice";

export const Profile = () => {
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

  useEffect(() => {
    handleProfile();
  }, [userName, dispatch]);
  return <div>{profileData?.name}</div>;
};
