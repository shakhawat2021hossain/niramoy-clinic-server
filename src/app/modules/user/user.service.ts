import type { Request } from "express"
import { prisma } from "../../utils/prisma"
import bcrypt from "bcrypt"
import { fileUploader } from "../../utils/fileUpload"
import { Role, type IOtherParams } from "./user.interface"
import type { IPaginateOp } from "../../utils/paginate"

const createPatient = async (req: Request) => {
    // console.log(req.file)
    if (req.file) {
        const uploadRes = await fileUploader.uploadToCloudinary(req.file)
        req.body.profilePhoto = uploadRes.secure_url
        // console.log("fileup", uploadRes)
    }

    const payload = req.body
    const hashedPass = await bcrypt.hash(payload.password, 10)
    // console.log("hashed", hashedPass)
    // console.log(payload)
    const userData = {
        password: hashedPass,
        email: payload.patient.email
    }
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: userData
        })

        return await tnx.patient.create({
            data: {
                ...payload.patient,
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
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    // console.log("hashed", hashedPass)
    console.log("hitted")

    const userData = {
        email: req.body.doctor.email,
        password: hashedPass,
    }
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                ...userData,
                role: Role.DOCTOR
            }
        })

        return await tnx.doctor.create({
            data: req.body.doctor
        })
    })
    // console.log("user creation",result)
    return result;

}


const createAdmin = async (req: Request) => {
    if (req.file) {
        const uploadRes = await fileUploader.uploadToCloudinary(req.file)
        req.body.profilePhoto = uploadRes.secure_url
        // console.log("fileup", uploadRes)
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    // console.log("hashed", hashedPass)
    console.log("hitted")

    const userData = {
        email: req.body.admin.email,
        password: hashedPass,
    }
    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                ...userData,
                role: Role.ADMIN
            }
        })

        return await tnx.admin.create({
            data: req.body.admin
        })
    })
    // console.log("user creation",result)
    return result;

}






const getAllUser = async ({ page, limit, sortBy, sortOrder }: IPaginateOp, otherParams: IOtherParams) => {
    // console.log(page, limit, searchTerm, sortBy, sortOrder)
    const skip = (page - 1) * limit
    const { role, status, searchTerm } = otherParams


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
    createAdmin,
    getAllUser
}