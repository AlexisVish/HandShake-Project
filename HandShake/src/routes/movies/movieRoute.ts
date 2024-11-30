import express from "express";
import { getAllMovies } from "../../controllers/movies/getAllMoviesController";
import { addMyMovie } from "../../controllers/movies/setMyMoviesController";


const router = express.Router();

router.get("/get-all-movies", getAllMovies);
router.post("/add-my-movie", addMyMovie);

export default router;

    