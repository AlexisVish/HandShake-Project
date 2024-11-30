import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
}
export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  password: String,
});

const User = model<IUser>("User", userSchema);
export default User;
