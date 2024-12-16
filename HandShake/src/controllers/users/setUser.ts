import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import { User } from '../../models/users/userModel';
const saltRounds = 10;

export const secret = '1234'

export async function register(req: any, res: any) {
  try {
    const { fullName, email, phone, password, confirmPassword, termsAgreed } = req.body;

    if (!fullName || !email || !phone || !password || !confirmPassword || !termsAgreed) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      termsAgreed,
    })

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  } 
};
  
