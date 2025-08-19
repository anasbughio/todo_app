const express = require('express');
const cors  = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todoRoutes  = require('./Routes/todoRoutes')


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: "https://todo-app-git-main-anas-projects-ddcc6eed.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use('/api/todos',todoRoutes);



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Mongo DB connected successfully');
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
})
.catch((err)=>console.log(err));
