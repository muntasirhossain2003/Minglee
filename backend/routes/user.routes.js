import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrentUser, suggestedUsers } from "../controllers/user.controllers.js";


const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.get("/suggested", isAuth, suggestedUsers);
export default userRouter;
