
import { Router } from "express";
import { insertMovies, getAllMovies } from "../../controllers/movies/getAllMovies";
import { addMyMovie } from "../../controllers/movies/setMyMovies";

const router = Router();

router.post("/insert-movies", insertMovies);
router.get("/movies", getAllMovies);
router.post("/add-my-movie", addMyMovie);

export default router;

    