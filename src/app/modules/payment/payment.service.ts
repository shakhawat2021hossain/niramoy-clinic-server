import type Stripe from "stripe";
import { prisma } from "../../utils/prisma";
import { PaymentStatus } from "@prisma/client";


const handleWebhookEvent = async (event: Stripe.Event) => {
    console.log("Received Stripe event:", event.type);
    switch (event.type) {
        case "checkout.session.completed": {
            const session = event.data.object as any;

            const appointmentId = session.metadata?.appointmentId;
            const paymentId = session.metadata?.paymentId;

            await prisma.appointment.update({
                where: {
                    id: appointmentId
                },
                data: {
                    paymentStatus: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID
                }
            })

            await prisma.payment.update({
                where: {
                    id: paymentId
                },
                data: {
                    status: session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID,
                    paymentGatewayData: session
                }
            })

            break;
        }

        default:
            console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
};

export const paymentServices = {
    handleWebhookEvent
}