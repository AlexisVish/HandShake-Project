import { model, Schema } from "mongoose";

export const movieSchema = new Schema({
  id: { type: String, required: true },
  name: {
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
});

const Movie = model("Movie", movieSchema);

export default Movie;
