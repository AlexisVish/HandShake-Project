
import jwt from "jwt-simple";
import Movie from "../../models/movies/movieModel";
import { secret } from "../users/setUser"; 

export async function getMyMovies(req: any, res: any): Promise<void> {
  try {
    const { user } = req.cookies;

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Decode the token
    const decoded = jwt.decode(user, secret);

    // Find movies by userId
    const myMovies = await Movie.find({ userId: decoded.id });

    if (!myMovies.length) {
      return res.status(404).json({ message: "No movies found for this user" });
    }

    return res.status(200).json({
      message: "Movies retrieved successfully",
      movies: myMovies,
    });
  } catch (error: any) {
    console.error("Error in GetMyMovies:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${error.message}` });
  }
}
