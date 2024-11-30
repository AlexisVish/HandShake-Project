import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
}
export const userSchema = new Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: Number,
  password: String,
});

const User = model<IUser>("User", userSchema);
export default User;
