import type { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { specialityServices } from "./speciality.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

const createSpeciality = catchAsync(async (req: Request, res: Response) => {
    const result = await specialityServices.createSpeciality(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

const getAllSpeciality = catchAsync(async (req: Request, res: Response) => {
    const result = await specialityServices.getAllSpeciality();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Specialties data fetched successfully',
        data: result,
    });
});

export const specialityControllers = {
    createSpeciality,
    getAllSpeciality
}