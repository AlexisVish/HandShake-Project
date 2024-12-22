import Meeting from "../../models/meeting/meetingModel";
import Movie from "../../models/movies/movieModel"; // Импорт модели фильмов

export async function getCommonMovies(req: any, res: any) {
  try {
    const meetingId = req.cookies?.meetingId || req.body.meetingId;

    if (!meetingId) {
      return res.status(400).json({ error: "Meeting ID is missing" });
    }

    const meeting = await Meeting.findOne({ meetingId });

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found" });
    }

    const participants = meeting.participants;

    if (participants.length === 0) {
      return res
        .status(404)
        .json({ error: "No participants found in meeting" });
    }

    const allMovies = participants.map(
      (participant) => participant.likedMovies
    );

    // Находим общие идентификаторы фильмов
    const [firstList, ...otherLists] = allMovies;

    if (!firstList || firstList.length === 0) {
      return res.status(200).json({ commonMovies: [] });
    }

    const commonMovieIds = firstList.filter((movieId) =>
      otherLists.every((list) => list.includes(movieId))
    );

    // Извлекаем названия фильмов из базы данных
    const commonMovies = await Movie.find({
      _id: { $in: commonMovieIds },
    }).select("title -_id");

    // Возвращаем список названий фильмов
    return res
      .status(200)
      .json({ commonMovies: commonMovies.map((movie) => movie.title) });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
