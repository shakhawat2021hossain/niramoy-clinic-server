import type { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status-codes"
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.createPatient(req)
    // console.log("body", req.file)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "User created successfully"
    })

})

export const userController = {
    createPatient
}