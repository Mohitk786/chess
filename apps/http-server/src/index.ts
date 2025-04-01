import db from '@chess/db/client';
import express from 'express';
import gameRoutes from "./routes/game"
import authRoutes from "./routes/auth"
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', gameRoutes);
app.use('/api', authRoutes);


app.listen(8000)