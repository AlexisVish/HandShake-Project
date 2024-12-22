import mongoose, { Schema, Document } from "mongoose";

// Interface for meeting
interface IMeeting extends Document {
  meetingId: string;
  participants: {
    userId: mongoose.Types.ObjectId;
    likedMovies: mongoose.Types.ObjectId[];
  }[];
}

// Meeting schema
const MeetingSchema: Schema = new Schema({
  meetingId: {
    type: String,
    required: true,
    unique: true,
  },
  participants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
      },
      likedMovies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Movie", // Reference to the Movie model
        },
      ],
    },
  ],
});

const Meeting = mongoose.model<IMeeting>("Meeting", MeetingSchema);

export default Meeting;
