import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  _id: string;
}
export const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  phone: String,
  password: String,
  _id: String,
});

export const User = model<IUser>("User", userSchema);

