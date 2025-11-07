import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    suggestedUsers: null,
    profileData: null,
    following: [], 

  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    toggleFollow: (state, action) => {
      const targetUserId = action.payload;
      if (!state.userData) return;
      
      const isFollowing = state.userData.following.some(id => {
        const idStr = (id?._id || id)?.toString();
        const targetIdStr = targetUserId?.toString();
        return idStr === targetIdStr;
      });
      
      if (isFollowing) {
        state.userData.following = state.userData.following.filter(id => {
          const idStr = (id?._id || id)?.toString();
          const targetIdStr = targetUserId?.toString();
          return idStr !== targetIdStr;
        });
      } else {
        state.userData.following.push(targetUserId);
      }
    },
  },
});

export const { setUserData, setSuggestedUsers, setProfileData, setFollowing, toggleFollow } = userSlice.actions;

export default userSlice.reducer;
