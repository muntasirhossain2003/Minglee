import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const uploadPost = async (req, res) => {
  try {
    const { caption, mediaType } = req.body;
    let media;
    if (req.file) {
      media = await uploadOnCloudinary(req.file.path);
    } else {
      return res.status(400).json({ message: "Media file is required!" });
    }
    const post = await Post.create({
      caption,
      media,
      mediaType,
      author: req.userId,
    });
    const user = await User.findById(req.userId);
    user.posts.push(post._id);
    await user.save();
    const populatedPost = await Post.findById(post._id).populate(
      "author",
      "name userName profileImage",
      "-password"
    );
    return res.status(201).json(populatedPost);
  } catch (error) {
    return res.status(500).json({ message: `Upload post error: ${error}` });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId }).populate(
      "author",
      "name userName profileImage",
      "-password"
    );
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: `Get all posts error: ${error}` });
  }
};
