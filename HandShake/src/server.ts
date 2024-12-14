import express from 'express'
import mongoose from 'mongoose';
import sqlite3 from 'sqlite3';
const app = express()
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//using mongoDB 
const dbUrl = "mongodb+srv://alexis:Vivalexxxa@cluster0.yzu9p.mongodb.net/";
const database = "HandShake";

mongoose.connect(`${dbUrl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});

//using SQL inner DB
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


import userRoute from './routes/users/userRoute';
app.use("/api/users", userRoute);

import movieRoute from './routes/movies/movieRoute';
app.use('/api/movies', movieRoute);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })