import type { IPaginateOp } from "../../utils/paginate"
import { prisma } from "../../utils/prisma"

const getAllDr = async (queryParams: IPaginateOp, whereConditions: any) => {

    const { limit, page, skip, sortBy, sortOrder } = queryParams
    console.log(queryParams)


    const result = await prisma.doctor.findMany({
        where: whereConditions,
        orderBy: {
            [sortBy]: sortOrder
        },
        skip,
        take: limit
    })

    return result

}

export const drServices = {
    getAllDr
}