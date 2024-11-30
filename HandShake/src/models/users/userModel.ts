import { model, Schema, Document } from "mongoose";

interface IUser extends Document {
  id: string;
  name: string;
}
export const userSchema = new Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
