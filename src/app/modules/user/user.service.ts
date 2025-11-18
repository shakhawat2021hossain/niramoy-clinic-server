import type { Request } from "express"
import { prisma } from "../../utils/prisma"
import bcrypt from "bcrypt"
import { fileUploader } from "../../utils/fileUpload"
import type { IGetUsers } from "./user.interface"

const createPatient = async (req: Request) => {
    // console.log(payload)
    if (req.file) {
        const uploadRes = await fileUploader.uploadToCloudinary(req.file)
        req.body.profilePhoto = uploadRes.secure_url
        console.log("fileup", uploadRes)
    }

    const payload = req.body
    console.log(payload)
    const hashedPass = await bcrypt.hash(payload.password, 10)
    console.log("hashed", hashedPass)
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: payload.email,
                password: hashedPass,

            }
        })

        return await tnx.patient.create({
            data: {
                email: payload.email,
                name: payload.name,
                profilePhoto: payload.profilePhoto
            }
        })
    })
    // console.log("user creation",result)
    return result;

}

const createDoctor = async (req: Request) => {
    if (req.file) {
        const uploadRes = await fileUploader.uploadToCloudinary(req.file)
        req.body.profilePhoto = uploadRes.secure_url
        // console.log("fileup", uploadRes)
    }

    const payload = req.body
    console.log(payload)
    const hashedPass = await bcrypt.hash(payload.password, 10)
    // console.log("hashed", hashedPass)
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: payload.email,
                password: hashedPass,

            }
        })

        return await tnx.doctor.create({
            data: {
                email: payload.email,
                name: payload.name,
                profilePhoto: payload.profilePhoto,
                registrationNumber: payload.registrationNumber,
                designation: payload.designation,
                qualification: payload.qualification,
                appointmentFee: payload.appointmentFee,
                currentWorkingPlace: payload.currentWorkingPlace,
                contactNumber: payload.contactNumber,
                gender: payload.gender
            }
        })
    })
    // console.log("user creation",result)
    return result;

}






const getAllUser = async ({ page, limit, searchTerm, sortBy, sortOrder, role, status }: IGetUsers) => {
    console.log(page, limit, searchTerm, sortBy, sortOrder)
    const skip = (page - 1) * limit


    const users = await prisma.user.findMany({
        skip,
        take: limit,
        where: {
            email: {
                contains: searchTerm,
                mode: "insensitive"
            },
            role: role,
            status: status
        },
        orderBy: sortBy && sortOrder ? {
            [sortBy]: sortOrder
        } : {
            createdAt: "desc"
        }
    })
    return users;
}


export const userServices = {
    createPatient,
    createDoctor,
    getAllUser
}