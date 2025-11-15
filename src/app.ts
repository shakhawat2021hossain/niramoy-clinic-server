import express from "express"
import type { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";

const app: Application = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
})); 

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Server is running..",
        uptime: process.uptime().toFixed(2) + " sec",
        timeStamp: new Date().toISOString()
    })
});



app.use(globalErrorHandler);

app.use(notFound);

export default app;