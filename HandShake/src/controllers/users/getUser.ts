import jwt from "jwt-simple";
import { User } from "../../models/users/userModel";
import { secret } from "./setUser";

export async function getUser(req: any, res: any): Promise<void> {
  try {
    const { user: userToken } = req.cookies; // get user token from cookies

    if (!userToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.decode(userToken, secret) as {
      id: string;
      role: string;
    }; 

    const foundUser = await User.findById(decoded.id).select("name email"); // выберите имя и email из базы данных

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: foundUser.name, email: foundUser.email });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
}
