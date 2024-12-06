import mongoose, { Schema, Document, model } from "mongoose";

<<<<<<< Updated upstream
export const movieSchema = new Schema({
  id: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  ischosen: {  type: Boolean, required: true, default: false },
  
=======
interface IMovie extends Document {
    title: string;
    year: number;
    genre: string;
    director: string;
    rating: number;
    imageURL: string;
}

const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    rating: { type: Number, required: true },
    imageURL: { type: String, required: true },
>>>>>>> Stashed changes
});

const Movie = model<IMovie>("Movie", MovieSchema);
export default Movie;
