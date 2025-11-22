import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { drServices } from "./doctor.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { paginate } from "../../utils/paginate";
import { buildWhere } from "../../utils/filter";

const getAllDr = catchAsync(async (req: Request, res: Response) => {
    
    
    const {searchTerm, sortBy, sortOrder, page, limit, ...filters} = req.query
    const whereConditions = buildWhere(searchTerm as string,  ['name', 'email'], filters)
    console.log(whereConditions)

    const queryParams = paginate(req.query)
    const result = await drServices.getAllDr(queryParams, whereConditions);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Doctor fetched successfully!",
        data: result
    })
})

export const drControllers = {
    getAllDr
}