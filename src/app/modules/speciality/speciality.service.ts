import type { Request } from "express";
import { prisma } from "../../utils/prisma"
import { fileUploader } from "../../utils/fileUpload";

const createSpeciality = async(req: Request) =>{
    if (req.file) {
        const uploadToCloudinary = await fileUploader.uploadToCloudinary(req.file);
        req.body.icon = uploadToCloudinary?.secure_url;
    }

    const result = await prisma.specialties.create({
        data: req.body
    })
    return result;
}


const getAllSpeciality = async() =>{
    return await prisma.specialties.findMany()
}




export const specialityServices = {
    createSpeciality,
    getAllSpeciality
}