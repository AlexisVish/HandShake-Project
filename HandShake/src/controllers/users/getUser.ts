import User from "../../models/users/userModel";
import { Request, Response } from "express";


export async function getUser(req: Request, res: Response) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({ message: "User found", user });
    }
    catch (error) {
        res.status(500).json({ message: "Error finding user", error });
    }
}