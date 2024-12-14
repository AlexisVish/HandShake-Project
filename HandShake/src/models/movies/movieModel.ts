import { db } from "../../server";

export interface Movie{
    title: string;
    genre: string;
    year: number;
    image_url: string
}


  
  export const getMovies = (callback: (err: Error | null, movies: Movie[]) => void) => {
    db.all('SELECT * FROM movies', [], (err, rows) => {
      callback(err, rows);
    });
  };
  
  export const getMovieById = (id: number, callback: (err: Error | null, movie?: Movie) => void) => {
    db.get('SELECT * FROM movies WHERE id = ?', [id], (err, row) => {
      callback(err, row);
    });
  };