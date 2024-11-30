import User from "../../models/users/userModel";
import jwt from "jwt-simple";
export const secret = "Alexis";
const bcrypt = require("bcrypt");
const saltRounds = 10;


export async function addUser(req: any, res: any) {
  try {
    const { id, name, email, phone, password } = req.body;
    console.log(phone);

    const result = await User.create({
      name,
      phone,
      email,
    });
    console.log(result);
    if (!result) {
      return res.status(400).send({ error: "No user info has been sent" });
    }
    return res
      .status(201)
      .send({ message: "User has been successfully added!" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).send({ error: "Couldn't add the user" });
  }
}
export async function register(req: any, res: any) {
  try {
    const { id, name, email, phone, password } = req.body;
    if(!id|| !name||!email||!phone||!password){throw new Error("Please fill all the fields");
    }
    const hashPassword = await bcrypt.hash(password, saltRound);
    console.log("pass", hashPassword);

    await User.create({
        id, name, email, phone, password
    })
    return res.status(201).send({message:"Registration successfully sompleted"})
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Couldn't register" });
  }
}
