import express from 'express';
import { addMeeting } from '../../controllers/meeting/setMeeting';

const router = express.Router();

router.post("/add-meeting", addMeeting);

export default router;

