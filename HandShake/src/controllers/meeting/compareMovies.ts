import Meeting from "../../models/meeting/meetingModel";
import Movie from "../../models/movies/movieModel";

export async function getCommonMovies(req: any, res: any) {
  try {
    const { meetingId } = req.params;
    if (!meetingId) {
      console.error("Meeting ID is missing");
      return res.status(400).json({ error: "Meeting ID is missing" });
    }

    console.log("Received Meeting ID:", meetingId);

    const meeting = await Meeting.findOne({ meetingId });
    if (!meeting) {
      console.error("Meeting not found for ID:", meetingId);
      return res.status(404).json({ error: "Meeting not found" });
    }

    console.log("Fetched Meeting:", meeting);

    const participants = meeting.participants || [];
    if (participants.length === 0) {
      return res.status(200).json({ commonMovies: [] });
    }

    // working with the likedMovies array of each participant
    const commonMovieIds = participants.reduce(
      (acc: string[], participant: any) => {
        const likedMovies = participant.likedMovies || [];
        if (!acc.length) {
          return likedMovies; // if acc is empty, return likedMovies
        }
        return acc.filter((id) => likedMovies.includes(id)); // else, return the intersection of acc and likedMovies
      },
      []
    );

    // get the common movies from the database
    const commonMovies = await Movie.find({
      _id: { $in: commonMovieIds },
    }).select("title -_id");

    console.log("Common Movies Titles:", commonMovies);

    return res.status(200).json({
      commonMovies: commonMovies.map((movie) => movie.title),
    });
  } catch (error: any) {
    console.error("Error in getCommonMovies:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
