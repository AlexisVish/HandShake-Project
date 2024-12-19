import mongoose, { Schema, Document, model } from "mongoose";

export interface IMovie extends Document {
    title: string;
    year: number;
    genre: string;
    director: string;
    rating: number;
    imageURL: string;
    userId?: string;
}

const MovieSchema: Schema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    rating: { type: Number, required: true },
    imageURL: { type: String, required: true },
    userId: { type: String }

});

const Movie = model<IMovie>("Movie", MovieSchema);
export default Movie;
