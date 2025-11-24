import type { JwtPayload } from "jsonwebtoken"
import type { IAppointment } from "./appointment.interface"
import { prisma } from "../../utils/prisma"
import { v4 as uuidv4 } from 'uuid';


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

        await tnx.payment.create({
            data: {
                appointmentId: appointment.id,
                amount: doctor.appointmentFee,
                transactionId
            }
        })
        return appointment

    })
    return result

}

export const appointmentServices = {
    createAppointment
}