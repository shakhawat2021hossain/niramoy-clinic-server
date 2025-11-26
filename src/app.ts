import express from "express"
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import { router } from "./app/route";
import cookieParser from "cookie-parser"
import { paymentControllers } from "./app/modules/payment/payment.controller";

const app: Application = express();
app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    paymentControllers.handleWebhookEvent
);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Server is running..",
        uptime: process.uptime().toFixed(2) + " sec",
        timeStamp: new Date().toISOString()
    })
});

app.use("/api/v1", router)



app.use(globalErrorHandler);

app.use(notFound);

export default app;