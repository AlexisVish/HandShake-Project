import { model, Schema } from "mongoose";

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
  
});

const Movie = model("Movie", movieSchema);

export default Movie;
