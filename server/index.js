import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config()

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post',postRoutes)
app.use('/api/v1/ai',aiRoutes)

app.get('/', async (req, res) => {
    res.send('Hello World')
})

const startServer= async() =>{

   try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8080,()=>{
        console.log("Server started at port 8080");
    })
   }
   catch(err) {
    console.log(err);
   }
}

startServer();