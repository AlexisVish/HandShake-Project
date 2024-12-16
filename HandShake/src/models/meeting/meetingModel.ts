import { model, Schema } from "mongoose";

export const meetingSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  UserID1:{
    type: String,
    required: true,
  },
  UserID2:{
    type: String,
    required: true,
  },
  meetingMovie:{
    type: String,
    required: true,
  },
});

const Meeting = model("Meeting", meetingSchema);

export default Meeting;
