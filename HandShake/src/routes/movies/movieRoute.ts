import { Router } from "express";
import { getAllMovies } from "../../controllers/movies/getAllMovies";
import { saveUserMovies } from "../../controllers/movies/setMyMovies";
import { getMyMovies } from "../../controllers/movies/getMyMovies";

const router = Router();

// router.post("/insert-movies", insertMovies);
router.get("/get-all-movies", getAllMovies);
router.post("/add-my-movies", saveUserMovies);
router.get("/get-my-movies", getMyMovies);
export default router;

   