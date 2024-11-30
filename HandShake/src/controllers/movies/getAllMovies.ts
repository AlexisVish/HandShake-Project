import Movie from "../../models/movies/movieModel";
import { Request, Response } from "express";


export async function getAllMovies(req: Request, res: Response) {
    try {
        const movies = await Movie.find();
        res.status(200).json({ message: "Movies found", movies });
    }
    catch (error) {
        res.status(500).json({ message: "Error finding movies", error });
    }
}