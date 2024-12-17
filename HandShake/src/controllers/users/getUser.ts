import jwt from "jwt-simple";
import { User } from "../../models/users/userModel";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET_KEY as string; // Secret key from .env

// Get User Controller
export async function getUser(req: any, res: any) {
  try {
    // Get token from cookies or headers
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    // Check if token is missing
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token is missing" });
    }

    // Decode token
    let decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Get user ID from decoded token
    const userId = decoded.id;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Invalid token: User ID is missing" });
    }

    // Find user by ID
    const user = await User.findById(userId).select("-password"); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send response to client
    return res.status(200).json({
      message: "User data retrieved successfully",
      user,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
