import Meeting from "../../models/meeting/meetingModel";
import { Request, Response } from "express";


export const addMeeting = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const meeting = new Meeting({ id });
        const savedMeeting = await meeting.save();

        res.status(201).json({ message: 'Meeting saved', savedMeeting });
    } catch (error) {
        res.status(500).json({ message: "Error saving meeting", error });
    }
};
