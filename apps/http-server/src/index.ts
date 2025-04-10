import express from 'express';
import gameRoutes from "./routes/game"
import authRoutes from "./routes/auth"
import cookieParser from 'cookie-parser';
import cors from 'cors';



const app = express();
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3002", "http://172.16.103.176:3002", "http://192.168.149.126:3002"], 
    credentials: true  
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', gameRoutes);
app.use('/api', authRoutes);


app.listen(8000, ()=>{
    console.log("Server is running on port 8000")
   
})