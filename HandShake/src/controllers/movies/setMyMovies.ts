import MeetingModel from "../../models/meeting/meetingModel";

// Controller to add movies to a meeting
export async function addMoviesToMeeting(req: any, res: any) {
  try {
    const { userId, meetingId, myMovies } = req.body;

    if (!userId || !meetingId || !myMovies || !Array.isArray(myMovies)) {
      return res.status(400).json({ message: "Invalid input data." });
    }

    // Find the meeting by meetingId or create a new one if it doesn't exist
    let meeting = await MeetingModel.findOne({ meetingId });

    if (!meeting) {
      meeting = new MeetingModel({
        meetingId,
        participants: [],
      });
    }

    // Check if the user already exists in the participants array
    const existingParticipant = meeting.participants.find((participant) => {
      if (typeof participant.userId === "string") {
        return participant.userId === userId;
      }
      return participant.userId.equals(userId);
    });

    if (existingParticipant) {
      // Update liked movies
      existingParticipant.likedMovies = myMovies;
    } else {
      // Add new participant
      meeting.participants.push({
        userId,
        likedMovies: myMovies,
      });
    }

    await meeting.save();

    res
      .status(200)
      .json({ message: "Movies added to the meeting successfully." });
  } catch (error) {
    console.error("Error adding movies to meeting:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
