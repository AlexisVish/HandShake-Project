import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  termsAgreed: boolean;
}
export const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>("User", userSchema);

