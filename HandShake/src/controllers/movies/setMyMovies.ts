import { Request, Response } from "express";
import Movie, { IMovie } from "../../models/movies/movieModel";

export const saveUserMovies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, movies } = req.body;

    // check if userId and movies array are provided
    if (!userId || !Array.isArray(movies) || movies.length === 0) {
      res
        .status(400)
        .json({ message: "User ID and movies array are required" });
      return;
    }

    // Save movies to the database
    const moviesToSave: IMovie[] = movies.map((movie: Partial<IMovie>) => ({
      ...movie, // unpack the movie object
      userId, // add the userId to the movie object
    })) as IMovie[]; // cast the array to IMovie[]

    // Save the movies to the database
    const savedMovies = await Movie.insertMany(moviesToSave);

    res.status(201).json({
      message: "Movies successfully saved",
      savedMovies,
    });
  } catch (error) {
    console.error("Error saving movies:", error);
    res
      .status(500)
      .json({ message: `Internal server error: ${(error as any).message}` });
  }
};
