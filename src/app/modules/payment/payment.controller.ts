import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { stripe } from "../../utils/stripe";
import { sendResponse } from "../../utils/sendResponse";
import { paymentServices } from "./payment.service";

const handleWebhookEvent = catchAsync(async (req: Request, res: Response) => {

    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = "whsec_ec296c9990a8d8b699d20129b154fc35ad2e55c569b831415a898e8082a3ac60"

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
        console.error("⚠️ Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    const result = await paymentServices.handleWebhookEvent(event);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Webhook request send successfully!',
        data: result,
    });
});

export const paymentControllers = {
    handleWebhookEvent
}