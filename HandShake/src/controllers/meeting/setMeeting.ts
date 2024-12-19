import jwt from "jwt-simple";
import dotenv from "dotenv";
import Meeting from "../../models/meeting/meetingModel";

dotenv.config();

const secret = process.env.SECRET_KEY as string; // JWT Secret key

// Controller for creating or joining a meeting
export async function setMeeting(req: any, res: any) {
  try {
    // 1. Получаем токен из cookies или заголовков
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token is missing" });
    }

    // 2. Декодируем токен и получаем userId
    let decoded;
    try {
      decoded = jwt.decode(token, secret);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const userId = decoded.id;
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Invalid token: User ID is missing" });
    }


    
    // 3. Получаем meetingId из запроса
    const { meetingId } = req.body;
    if (!meetingId) {
      return res.status(400).json({ error: "Meeting ID is required" });
    }

    // 4. Находим митинг или создаём новый
    let meeting = await Meeting.findOne({ meetingId });

    if (!meeting) {
      // Создаём новый митинг
      meeting = await Meeting.create({
        meetingId,
        participants: [{ userId, likedMovies: [] }],
      });

      // Добавляем meetingId в cookies
      res.cookie("meetingId", meetingId, {
        httpOnly: false, // Чтобы cookie был доступен на клиентской стороне
        maxAge: 60 * 60 * 1000, // 1 час
      });

      return res.status(201).json({
        message: "Meeting created successfully",
        meeting,
      });
    }

   const isUserInMeeting = meeting.participants.some((participant) => {
     if (typeof participant.userId === "string") {
       return participant.userId === userId;
     }
     return participant.userId.equals(userId);
   });

   if (!isUserInMeeting) {
     meeting.participants.push({ userId, likedMovies: [] });
     await meeting.save();
   } else {
     console.log("User already exists in the meeting.");
   }
     // 6. Возвращаем успешный ответ
    return res.status(200).json({
      message: "User successfully added to the meeting",
      meeting,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
