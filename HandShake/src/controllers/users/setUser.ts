import dotenv from "dotenv";
dotenv.config();

import jwt from "jwt-simple";
import bcrypt from "bcrypt";
import { User } from "../../models/users/userModel";

const secret = process.env.SECRET_KEY as string; // Secret key from .env
const saltRounds = parseInt(process.env.SALT_ROUNDS || "10"); // Salt rounds from .env

// Register controller
export async function register(req: any, res: any) {
  try {
    const { fullName, email, phone, password, confirmPassword, termsAgreed } =
      req.body;

    if (
      !fullName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !termsAgreed
    ) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User with this email already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      termsAgreed,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: newUser, // send user data back to the client
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Login controller
export async function login(req: any, res: any) {
  try {
    const { email, password, rememberMe } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.encode(
      {
        id: user._id,
        exp:
          Math.floor(Date.now() / 1000) +
          (rememberMe ? 7 * 24 * 60 * 60 : 60 * 60),
      },
      secret
    );

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000, // 7 days or 1 hour
    });

    // Send response to client
    return res.status(200).json({
      message: "Login successful",
      user: {
        fullName: user.fullName,
      },
      token,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
