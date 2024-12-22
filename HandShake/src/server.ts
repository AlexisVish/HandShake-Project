import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//using mongoDB
const dbUrl =
  "mongodb+srv://Yulia:r0MTDkJoo6ropL10@cluster0.gl27q.mongodb.net";
const database = "HandShake";

mongoose
  .connect(`${dbUrl}/${database}`)
  .then(() => {
    console.info("DB connected");
  })
  .catch((err) => {
    console.error(err);
  });


import userRoute from "./routes/users/userRoute";
app.use("/api/users", userRoute);

import meetingRoute from "./routes/meeting/meetingRoute";
app.use("/api/meeting", meetingRoute);

import movieRoute from "./routes/movies/movieRoute";
app.use("/api/movies", movieRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
