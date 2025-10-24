import bcrypt from "bcryptjs";
import sendMail from "../config/Mail.js";
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

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist!" });
    }
    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // Set OTP expiration time (5 minutes from now)
    const otpExpires = (Date.now() + 5 * 60 * 1000);  
    user.resetOtp = otp;
    user.otpExpires = otpExpires;
    user.isOtpVerified = false;
    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent to email!" });    
    
  } catch (error) {
    return res.status(500).json({ message: `Error sending OTP: ${error}` });
  }
    // To be implemented
}

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "invalid/expired OTP" });
    }
    
    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `Error verifying OTP: ${error}` });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    return res.status(500).json({ message: `Error resetting password: ${error}` });
  }
}
