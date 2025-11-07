import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";
import { toggleFollow } from "../redux/userSlice";

function FollowButton({ targetUserId, tailwind, onFollowChange }) {
  const following = useSelector(
    (state) => state.user?.userData?.following || []
  );
  const isFollowing = following.some((id) => {
    const idStr = (id?._id || id)?.toString();
    const targetIdStr = targetUserId?.toString();
    return idStr === targetIdStr;
  });
  const dispatch = useDispatch();
  const handleFollow = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/follow/${targetUserId}`,
        {
          withCredentials: true,
        }
      );
      if (onFollowChange) {
        onFollowChange();
      }
      dispatch(toggleFollow(targetUserId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button className={tailwind} onClick={handleFollow}>
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
