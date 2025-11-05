import express from "express";
import { editProfile, follow, getCurrentUser, getProfile, suggestedUsers } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";


const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/suggested", isAuth, suggestedUsers);
userRouter.get("/getProfile/:userName", isAuth, getProfile);
userRouter.get("/follow/:targetUserId", isAuth, follow);
userRouter.post("/editProfile", isAuth,upload.single('profileImage'), editProfile);
export default userRouter;
