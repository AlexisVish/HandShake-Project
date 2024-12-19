import { Router } from "express";
import { getAllMovies } from "../../controllers/movies/getAllMovies";
import { addMoviesToMeeting } from "../../controllers/movies/setMyMovies";
import { getMyMovies } from "../../controllers/movies/getMyMovies";

const router = Router();


router.get("/get-all-movies", getAllMovies);
router.get("/get-my-movies", getMyMovies);
router.post("/add-movies-to-meeting", addMoviesToMeeting);
export default router;
