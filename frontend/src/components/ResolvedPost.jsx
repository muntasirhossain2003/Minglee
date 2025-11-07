import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serverUrl } from "../App";
import Post from "./Post";

export default function ResolvedPost({ savedItem }) {
  const { postData } = useSelector((state) => state.post);
  const [postObj, setPostObj] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const savedId = savedItem?._id || savedItem?.id || savedItem;
    console.log("ResolvedPost: savedItem received:", savedItem);
    console.log("ResolvedPost: extracted savedId:", savedId);

    // If savedItem already looks like a full post object with author populated
    // Check that author is an object, not just a string ID
    if (
      savedItem &&
      savedItem.author &&
      typeof savedItem.author === "object" &&
      savedItem.author.userName &&
      (savedItem._id || savedItem.id)
    ) {
      console.log("ResolvedPost: Using savedItem directly as full post");
      setPostObj(savedItem);
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    // Try to find it in postData first
    const found = postData.find(
      (p) => (p._id || p.id)?.toString() === String(savedId)
    );
    if (found && found.author) {
      console.log("ResolvedPost: Found in postData:", found);
      setPostObj(found);
      setLoading(false);
      return () => {
        mounted = false;
      };
    }

    // Fetch from backend if not found locally or author not populated
    const fetchPost = async () => {
      if (!savedId) {
        setLoading(false);
        return;
      }
      try {
        console.log("ResolvedPost: Fetching post from backend, id:", savedId);
        const res = await axios.get(`${serverUrl}/api/post/${savedId}`, {
          withCredentials: true,
        });
        if (!mounted) return;
        console.log("ResolvedPost: Fetched post:", res.data);
        setPostObj(res.data);
        setLoading(false);
      } catch (err) {
        console.log(
          "ResolvedPost fetch error:",
          err?.response?.data || err.message || err
        );
        if (!mounted) return;
        setLoading(false);
      }
    };
    fetchPost();
    return () => {
      mounted = false;
    };
  }, [savedItem, postData]);

  console.log("ResolvedPost: Render - loading:", loading, "postObj:", postObj);
  if (loading) return null;
  if (!postObj) return null;
  return <Post key={postObj._id || postObj.id} post={postObj} />;
}
