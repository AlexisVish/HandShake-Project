import { Request, Response } from 'express';
import Movie from '../../models/movies/movieModel';


export const addMyMovie = async (req: Request, res: Response) => {
    try {
        const { id, name, imageUrl, genre } = req.body;
        const myMovie = new Movie({ id, name, imageUrl, genre });

        const savedMyMovie = await myMovie.save();

        res.status(201).json({ message: 'My movie saved', savedMyMovie });
    } catch (error) {
        res.status(500).json({ message: 'Error saving my movie', error });
    }
};