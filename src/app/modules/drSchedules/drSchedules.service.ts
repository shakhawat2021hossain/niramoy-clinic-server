import type { JwtPayload } from "jsonwebtoken"
import { prisma } from "../../utils/prisma"

const addSchedule = async (user: JwtPayload, payload: { scheduleIds: string[] }) => {
    console.log(payload)
    const doctor = await prisma.doctor.findUniqueOrThrow({
        where: {
            email: user.email
        }
    })
    // console.log(doctor)
    const drSchedules = payload.scheduleIds.map(scheduleId => {
        return {
            doctorId: doctor.id,
            scheduleId
        }
    })
    // console.log(drSchedules)
    const result = await prisma.doctorSchedules.createMany({
        data: drSchedules
    })
    return result

}



export const drScheduleServices = {
    addSchedule
}