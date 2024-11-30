import express from "express";
import { getAllMovies } from "../../controllers/movies/getAllMovies";
import { addMyMovie } from "../../controllers/movies/setMyMovies";


const router = express.Router();

router.get("/get-all-movies", getAllMovies);
router.post("/add-my-movie", addMyMovie);

export default router;

    