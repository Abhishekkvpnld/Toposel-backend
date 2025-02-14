import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { userName, email, password, country, dob, fullName, gender } =
      req.body;

    if (
      !userName ||
      !email ||
      !password ||
      !country ||
      !dob ||
      !fullName ||
      !gender
    ) {
      throw new Error("Please add all details...📩");
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const checkUser = await userModel.findOne({ email: email });
    if (checkUser) {
      throw new Error("User already exists with this email.");
    }

    const user = new userModel({
      userName,
      email,
      fullName,
      gender,
      country,
      dob,
      password: encryptPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: user,
      error: false,
      message: "User Created Successfully...✅✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please Enter All Details");
    }

    const checkUser = await userModel.findOne({ email: email });

    if (!checkUser) {
      throw new Error("User Not Registered...🤦‍♂️");
    }

    const CheckPassword = await bcrypt.compare(password, checkUser.password);

    if (!CheckPassword) {
      throw new Error("Invalid Credentials...❌");
    }

    const userData = {
      _id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
      country: checkUser.country,
      gender: checkUser.gender,
      fullName: checkUser.fullName,
      dob: checkUser.dob,
      createdAt: checkUser.createdAt,
    };

    const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    });

    if (!token) {
      throw new Error("Token generation failed");
    }

    const tokenOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.cookie("token", token, tokenOption).status(200).json({
      success: true,
      error: false,
      message: "Logged in Successfully...✅",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const fetchUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return;
    }

    const userData = await userModel.findById(userId).lean();
    if (!userData) {
      throw new Error("User not found...❌");
    }

    delete userData.password;

    res.status(200).json({
      success: true,
      error: false,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.clearCookie("token", tokenOption);

    res.status(200).json({
      message: "Logged out successfully...🎉",
      data: [],
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const search = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query parameter is required" });
    }

    const searchRegex = new RegExp(query, "i");

    const users = await userModel
      .find({
        $or: [{ name: searchRegex }, { email: searchRegex }],
      })
      .select("-password");

    res.status(200).json({ success: true, error: false, users });
  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
