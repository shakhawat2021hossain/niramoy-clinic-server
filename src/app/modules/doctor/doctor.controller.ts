import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { drServices } from "./doctor.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { paginate } from "../../utils/paginate";
import { buildWhere } from "../../utils/filter";
import type { JwtPayload } from "jsonwebtoken";

const getAllDr = catchAsync(async (req: Request, res: Response) => {
    
    
    const {searchTerm, sortBy, sortOrder, page, limit, ...filters} = req.query
    const whereConditions = buildWhere(searchTerm as string,  ['name', 'email', "doctorSpecialties"], filters)
    console.log(whereConditions)

    const queryParams = paginate(req.query)
    const doctors = await drServices.getAllDr(queryParams, whereConditions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor fetched successfully!",
        meta: doctors.meta,        
        data: doctors.data
    })
})


const updateDr = catchAsync(async (req: Request, res: Response) => {
    const result = await drServices.updateDr(req.body, req.user as JwtPayload, req.params.id as string)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor updated successfully!",      
        data: result
    })
})



export const drControllers = {
    getAllDr,
    updateDr
}