import type { JwtPayload } from "jsonwebtoken"
import type { IAppointment } from "./appointment.interface"
import { prisma } from "../../utils/prisma"
import { v4 as uuidv4 } from 'uuid';
import { stripe } from "../../utils/stripe";


const createAppointment = async (decodedToken: JwtPayload, payload: IAppointment) => {
    // console.log(decodedToken)
    const patient = await prisma.patient.findFirstOrThrow({
        where: {
            email: decodedToken.email
        }
    })
    console.log(patient)

    const doctor = await prisma.doctor.findUniqueOrThrow({
        where: {
            id: payload.doctorId,
            isDeleted: false
        }
    });


    const isBooked = await prisma.doctorSchedules.findFirstOrThrow({
        where: {
            doctorId: payload.doctorId,
            scheduleId: payload.scheduleId,
            isBooked: false
        }
    })
    console.log("isbooked", isBooked)

    const videoCallingId = uuidv4()
    // console.log(videoCallingId)

    const appointmentData = {
        ...payload,
        patientId: patient.id,
        videoCallingId
    }



    const result = await prisma.$transaction(async (tnx) => {
        const appointment = await tnx.appointment.create({
            data: appointmentData
        })

        await tnx.doctorSchedules.update({
            where: {
                doctorId_scheduleId: {
                    doctorId: doctor.id,
                    scheduleId: payload.scheduleId
                }
            },
            data: {
                isBooked: true
            }
        })

        const transactionId = uuidv4();



        const payment = await tnx.payment.create({
            data: {
                appointmentId: appointment.id,
                amount: doctor.appointmentFee,
                transactionId
            }
        })


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: patient.email,
            line_items: [
                {
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: `Appointment with ${doctor.name}`,
                        },
                        unit_amount: doctor.appointmentFee * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                appointmentId: appointment.id,
                paymentId: payment.id
            },
            success_url: `https://www.programming-hero.com/`,
            cancel_url: `https://next.programming-hero.com/`,
        });

        return { appointment, session }

    })
    return result

}

export const appointmentServices = {
    createAppointment
}