import jwt from "jwt-simple";
import { User } from "../../models/users/userModel";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET_KEY as string; // Secret key from .env

// Get User Controller
export async function getUser(req: any, res: any) {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.error("No token provided");
      return res.status(401).json({ error: "Unauthorized: Token is missing" });
    }

    const decoded = jwt.decode(token, secret);

    const userId = decoded.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      fullName: user.fullName,
    });
  } catch (error) {
    console.error("Error in GetUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
