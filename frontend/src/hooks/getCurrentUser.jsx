import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
export const serverUrl = "http://localhost:8000";

const getCurrentUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(result.data.user));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
};

export default getCurrentUser;
