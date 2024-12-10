import jwt from "jwt-simple";
import { User } from "../../models/users/userModel";
import { secret } from "./setUser";

export async function getUser(req: any, res: any): Promise<void> {
  try {
    const { user: userToken, meetingId } = req.cookies; // get user token and meetingId from cookies

    if (!userToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.decode(userToken, secret) as {
      id: string;
      role: string;
    }; 

    const foundUser = await User.findById(decoded.id); // find user by id in the database

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data: id, email, name, and meetingId to the client
    res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name, 
        meetingId,
      },
    });
  } catch (error: any) {
    console.error("Error in GetUser:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
}
