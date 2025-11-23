import type { Doctor } from "@prisma/client"
import type { IPaginateOp } from "../../utils/paginate"
import { prisma } from "../../utils/prisma"
import type { JwtPayload } from "jsonwebtoken"
import { Role } from "../user/user.interface"
import AppError from "../../utils/AppError";
import httpStatus from "http-status-codes"
import type { IDoctorUpdateIp } from "./doctor.interface"

const getAllDr = async (queryParams: IPaginateOp, whereConditions: any) => {

    const { limit, page, skip, sortBy, sortOrder } = queryParams
    // console.log(queryParams)
    // console.log("wherecond", whereConditions.AND[0])
    


    const result = await prisma.doctor.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        },
        skip,
        take: limit,
         include: {
            doctorSpecialties: {
                include: {
                    specialities: true
                }
            }
        }
    })

    const total = await prisma.doctor.count({
        where: whereConditions
    })


    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    }

}

const updateDr = async (payload: Partial<IDoctorUpdateIp>, decodedToken: JwtPayload, userId: string) => {
    // console.log("user", decodedToken, userId)

    const doctor = await prisma.doctor.findFirstOrThrow({
        where: {
            id: userId
        }
    })

    if (decodedToken.role === Role.DOCTOR) {
        if (decodedToken.email !== doctor.email) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized")
        }
    }

    // console.log("dr", doctor)
    
    const { specialities, ...drData } = payload
    // console.log("payload", payload)
    
    const result = await prisma.$transaction(async (tnx) => {

        // update specialities
        if (specialities && specialities.length > 0) {

            // remove
            const deleteSpecialtyIds = specialities.filter((specialty) => specialty.isDeleted);
            for (const specialty of deleteSpecialtyIds) {
                await tnx.doctorSpecialties.deleteMany({
                    where: {
                        doctorId: userId,
                        specialitiesId: specialty.specialtyId
                    }
                })
            }


            // add
            const createSpecialtyIds = specialities.filter((specialty) => !specialty.isDeleted);
            for (const specialty of createSpecialtyIds) {
                await tnx.doctorSpecialties.create({
                    data: {
                        doctorId: userId,
                        specialitiesId: specialty.specialtyId
                    }
                })
            }

        }

        // update others data
        return await tnx.doctor.update({
            where: {
                id: userId
            },
            data: drData,
            include: {
                doctorSpecialties: true
            }
        })

    })

    return result

}

export const drServices = {
    getAllDr,
    updateDr
}