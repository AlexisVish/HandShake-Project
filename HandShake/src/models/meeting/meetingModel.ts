import { model, Schema } from "mongoose";

export const meetingSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
});

const Meeting = model("Meeting", meetingSchema);

export default Meeting;
