import express from "express";
import isAuth from "../middlewares/isAuth.js";

import {
    comment,
    getAllPosts,
    getPostById,
    like,
    saved,
    uploadPost,
} from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.js";

const postRouter = express.Router();

postRouter.post("/upload", isAuth, upload.single("media"), uploadPost);
postRouter.get("/getAll", isAuth, getAllPosts);
postRouter.get("/like/:postId", isAuth, like);
postRouter.get("/saved/:postId", isAuth, saved);
postRouter.post("/comment/:postId", isAuth, comment);
postRouter.get("/:postId", isAuth, getPostById);
export default postRouter;
