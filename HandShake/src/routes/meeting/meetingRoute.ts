import { Router } from "express";
import { setMeeting } from "../../controllers/meeting/setMeeting";
import { getCommonMovies } from "../../controllers/meeting/compareMovies";


const router = Router();

router.post("/set-meeting", setMeeting);
router.get("/common-movies/:meetingId", getCommonMovies);

export default router;