import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import User from "../models/user.model.js";

export const signUp = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    const findByEmail = await User.findOne({ email });
    if (findByEmail) {
      return res.status(400).json({ message: "userEmail already exists!" });
    }
    const findByUserName = await User.findOne({ userName });
    if (findByUserName) {
      return res.status(400).json({ message: "userName already exists!" });
    }
    if(password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      userName,
      email,
      password: hashedPassword,
    });
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: `Error creating user: ${error}` });
  }
}
export const signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({ message: "user not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ message: "Incorrect Password!" });
    }
    
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `SignIn error: ${error}` });
  }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token", {  
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
        });
        return res.status(200).json({ message: "SignOut successful!" });
    } catch (error) {
        res.status(500).json({ message: `SignOut error: ${error}` });
    }
}
