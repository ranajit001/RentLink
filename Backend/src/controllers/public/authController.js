import UserModel from "../../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { configDotenv } from "dotenv";
configDotenv()


const ACCESS_SECRET = process.env.JWT_SECRET ;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ;


const generateTokens = (user) => {
  const payload = { id: user._id, role: user.role,email:user.email };

  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "10d" });
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "30d" });

  return { accessToken, refreshToken };
};

//  Register User (Tenant or Landlord)
export const registerUser = async (req, res) => { 

  try {
    const { name, email, password, role, contactInfo, language } = req.body;

    const existingUser = await UserModel.findOne({ email,role });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await argon2.hash(password);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      contactInfo,
      language,
    });

    await newUser.save();

    const { accessToken, refreshToken } = generateTokens(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true for https
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dats
    });

    res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        contactInfo
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

//  Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password,role } = req.body;

    const user = await UserModel.findOne({ email,role });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        contactInfo:user.contactInfo
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Refresh Token
export const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;  

  if (!token)
    return res.status(401).json({ message: "No refresh token found" });

  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    const accessToken = jwt.sign(
      { _id: decoded._id, role: decoded.role },
      ACCESS_SECRET,
      { expiresIn: "10d" }
    );

    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};

// Logout (clears cookie)
export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};
