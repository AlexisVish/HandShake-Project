import jwt from "jwt-simple";
import { Request, Response } from "express";
import { User } from "../../models/users/userModel";
import { secret } from "./setUser"; // Убедитесь, что secret импортирован корректно

export async function getUser(req: Request, res: Response): Promise<void> {
  try {
    const { user } = req.cookies;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(user, secret) as { id: string; role: string };

    const foundUser = await User.findById(decoded.id);

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: foundUser._id,
        email: foundUser.email,
      },
    });
  } catch (error: any) {
    console.error("Error in GetUser:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
}
