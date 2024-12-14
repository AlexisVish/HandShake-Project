import User from "../../models/users/userModel";
import jwt from "jwt-simple";
export const secret = "Alexis";
const bcrypt = require("bcrypt");
const saltRounds = 10;

export async function addUser(req: any, res: any) {
  try {
    const { id, name, email, phone, password } = req.body;
    console.log(phone);
    if (!name || !email || !phone || !password) {
      return res.status(400).send({ error: "Please fill all the fields" });
    }
    
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const result = await User.create({
      name,
      phone,
      email,
    });
    console.log(result);
    if (!result) {
      return res.status(400).send({ error: "No user info has been sent" });
    }
    return res.status(201).send({ message: "User has been successfully added!" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).send({ error: "Couldn't add the user" });
  }
}
export async function register(req: any, res: any) {
  try {
    const { id, name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    
    if (!id || !name || !email || !phone || !password) {
      throw new Error("Please fill all the fields");
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      id,
      name,
      email,
      phone,
      password:hashPassword,
    });
    await newUser.save();

    const payload = { _id: newUser._id, email: newUser.email };
    const token = jwt.encode(payload, secret)
    return res
      .status(201)
      .send({ message: "Registration successfully sompleted" });
  } catch (error) {
 
    console.error(error);
    return res.status(500).send({ error: "Couldn't register" });
  }
}

export async function login(req: any, res: any) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please fill all the fields!");
      return res.status(400).send({ error: "Please fill all the fields!" });

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

    const token = jwt.encode({ _id: user._id, email: user.email }, secret);
    res.cookie("user", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).send({ message: "Login was syccessfully completed!" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Couldn't login." });
  }
}
