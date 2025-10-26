import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSuggestedUsers, setUserData } from "../redux/userSlice";
export const serverUrl = "http://localhost:8000";

const getSuggestedUsers = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(state => state.user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/suggested`, {
          withCredentials: true,
        });
        dispatch(setSuggestedUsers(result.data.users));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [userData]);
};

export default getSuggestedUsers;
