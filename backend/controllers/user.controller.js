import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        console.log("REGISTER hit - content-type:", req.headers["content-type"]);
        console.log("body:", req.body);
        console.log("file:", req.file);

        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ 
                message: "Something is missing", 
                success: false 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Handle file upload (optional)
        let profilePhoto = "";
        if (req.file) {
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                profilePhoto = cloudResponse.secure_url;
                console.log("Profile photo uploaded:", profilePhoto);
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                // Continue without photo
            }
        }

        // Create user
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto
            }
        });

        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                role: newUser.role,
                profile: newUser.profile
            },
            success: true
        });

    } catch (error) {
        console.error("register error:", error);
        return res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password.",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(401).json({
                message: "Account type mismatch.",
                success: false
            });
        }

        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            sameSite: 'strict' 
        }).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });

    } catch (error) {
        console.error("login error:", error);
        return res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.error("logout error:", error);
        return res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, skills } = req.body;
        const file = req.file;

        const skillsArray = skills ? skills.split(',') : [];

        let resume = "";
        let resumeOriginalName = "";
        if (file) {
            try {
                const fileUri = getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                resume = cloudResponse.secure_url;
                resumeOriginalName = file.originalname;
            } catch (uploadError) {
                console.error("Resume upload error:", uploadError);
            }
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    "profile.bio": bio,
                    "profile.skills": skillsArray,
                    ...(resume && { "profile.resume": resume }),
                    ...(resumeOriginalName && { "profile.resumeOriginalName": resumeOriginalName })
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        });

    } catch (error) {
        console.error("updateProfile error:", error);
        return res.status(500).json({ 
            message: "Server error", 
            error: error.message 
        });
    }
}