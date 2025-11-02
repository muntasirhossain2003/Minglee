import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setPostData } from "../redux/postSlice";
export const serverUrl = "http://localhost:8000";

const getAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/post/getAll`, {
          withCredentials: true,
        });
        dispatch(setPostData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, [dispatch]);
};

export default getAllPost;
