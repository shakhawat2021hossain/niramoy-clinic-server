import type { Request } from "express"
import { prisma } from "../../utils/prisma"
import type { IUser } from "./user.interface"
import bcrypt from "bcrypt"
import { fileUploader } from "../../utils/fileUpload"

const createPatient = async (req: Request) => {
    // console.log(payload)
    if(req.file){
        const uploadRes = await fileUploader.uploadToCloudinary(req.file)
        console.log("fileup", uploadRes)
    }

    // const payload = req.body.data
    // console.log(payload)
    // const hashedPass = await bcrypt.hash(payload.password, 10)
    // console.log("hashed", hashedPass)
    // const result = await prisma.$transaction(async (tnx) => {
    //     await tnx.user.create({
    //         data: {
    //             email: payload.email,
    //             password: hashedPass
    //         }
    //     })

    //     return await tnx.patient.create({
    //         data: {
    //             email: payload.email,
    //             name: payload.name
    //         }
    //     })
    // })
    // console.log("user creation",result)
    // return result

}


export const userServices = {
    createPatient,

}