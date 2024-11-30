import express from 'express';
import { addMeeting } from '../../controllers/meeting/setMeetingController';

const router = express.Router();

router.post("/add-meeting", addMeeting);

export default router;

