import express from 'express'
import mongoose from 'mongoose';
const app = express()
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const dbUrl = "mongodb+srv://Yulia:r0MTDkJoo6ropL10@cluster0.gl27q.mongodb.net";
const database = "HandShake";

mongoose.connect(`${dbUrl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});

import userRoute from './routes/users/userRoute';
app.use("/api/users", userRoute);



app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })