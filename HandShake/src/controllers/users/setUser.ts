import { User } from "../../models/users/userModel";
import jwt from "jwt-simple";
export const secret = "Alexis";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function register(req: any, res: any) {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    if ( !name || !email || !phone || !password ) {
      throw new Error("Please fill all the fields");
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      name,
      email,
      phone,
      password:hashPassword,
    });
 
    return res
      .status(201)
      .send({ message: "Registration successfully completed" });
  } catch (error) {
    console.error(error);
    if ((error as any).code === "11000") {
      res.status(400).send({ error: "user already exists" });
    }
    console.error(error);
    return res.status(500).send({ error: "Couldn't register" });
  }
}

export async function login(req: any, res: any) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please fill all the fields!");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: "Couldn't get the email." });
    }
    if (!user.password) throw new Error("Incorrect password!");
    const match = await bcrypt.compare(password, user.password);
    console.log("is match", match);
    if (!match) {
      return res.status(400).send({ error: "The password is incorrect" });
    }

    const token = jwt.encode({ id: user._id, role: "user" }, secret);
    res.cookie("user", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Error in login:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
}
