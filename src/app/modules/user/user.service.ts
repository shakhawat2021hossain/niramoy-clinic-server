import { prisma } from "../../utils/prisma"
import type { IUser } from "./user.interface"
import bcrypt from "bcrypt"

const createPatient = async (payload: IUser) => {
    // console.log(payload)
    const hashedPass = await bcrypt.hash(payload.password, 10)
    console.log("hashed", hashedPass)
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: payload.email,
                password: hashedPass
            }
        })

        return await tnx.patient.create({
            data: {
                email: payload.email,
                name: payload.name
            }
        })
    })
    console.log(result)
    return result

}


export const userServices = {
    createPatient,

}