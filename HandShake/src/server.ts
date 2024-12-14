import express from "express";
import mongoose from "mongoose";
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//using mongoDB
const dbUrl = "mongodb+srv://alexis:Vivalexxxa@cluster0.yzu9p.mongodb.net/";
const database = "HandShake";

mongoose
  .connect(`${dbUrl}/${database}`)
  .then(() => {
    console.info("DB connected");
  })
  .catch((err) => {
    console.error(err);
  });

import sqlite3 from "sqlite3";

//using SQL inner DB
export const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.run(`CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  genre TEXT NOT NULL,
  year INTEGER,
  image_url TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS meetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user1_id INTEGER NOT NULL,
        user2_id INTEGER NOT NULL
      )`);
db.run(`CREATE TABLE IF NOT EXISTS handShake (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        meeting_id INTEGER NOT NULL,
        user1_id INTEGER NOT NULL,
        user2_id INTEGER NOT NULL,
        movie_id INTEGER NOT NULL
      )`);

module.exports = db;

import userRoute from "./routes/users/userRoute";
app.use("/api/users", userRoute);

import movieRoute from "./routes/movies/movieRoute";
app.use("/api/movies", movieRoute);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
