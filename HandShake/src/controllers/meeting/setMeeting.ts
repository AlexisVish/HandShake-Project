import jwt from "jwt-simple";
import dotenv from "dotenv";
import Meeting from "../../models/meeting/meetingModel";

dotenv.config();

const secret = process.env.SECRET_KEY as string; // JWT Secret key

// Controller for creating or joining a meeting
export async function setMeeting(req: any, res: any) {
  try {
    // get the token from the cookies or headers
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token is missing" });
    }

    // decode the token to get the user ID
    let decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const userId = decoded.id;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Invalid token: User ID is missing" });
    }
    
    // get the meetingId from the request body
    const { meetingId } = req.body;
    if (!meetingId) {
      return res.status(400).json({ error: "Meeting ID is required" });
    }

    // find the meeting in the database or create a new one
    let meeting = await Meeting.findOne({ meetingId });

    if (!meeting) {
      // create a new meeting
      meeting = await Meeting.create({
        meetingId,
        participants: [{ userId, likedMovies: [] }],
      });

      // add the meetingId to the cookies
      res.cookie("meetingId", meetingId, {
        httpOnly: false, // for reading the cookie in the frontend
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      return res.status(201).json({
        message: "Meeting created successfully",
        meeting,
      });
    }

    // check if the user is already in the meeting
   const isUserInMeeting = meeting.participants.some((participant) => {
     if (typeof participant.userId === "string") {
       return participant.userId === userId;
     }
     return participant.userId.equals(userId);
   });

   if (!isUserInMeeting) {
     meeting.participants.push({ userId, likedMovies: [] });
     await meeting.save();
   } else {
     console.log("User already exists in the meeting.");
   }
     // add the meetingId to the cookies
    return res.status(200).json({
      message: "User successfully added to the meeting",
      meeting,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
