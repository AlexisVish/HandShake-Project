import Movie from "../../models/movies/movieModel";


export async function getAllMovies(req: any, res: any) {
  try {
    const movies = await Movie.find();
    res.status(200).json({ message: "Movies found", movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Error finding movies", error });
  }
}

