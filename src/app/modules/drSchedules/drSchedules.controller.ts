import type { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { drScheduleServices } from "./drSchedules.service"
import type { JwtPayload } from "jsonwebtoken"

const addSchedule = catchAsync(async (req: Request, res: Response) => {

    const result = await drScheduleServices.addSchedule(req.user as JwtPayload, req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "added schedules for the dr"
    })

})

export const drScheduleControllers = {
    addSchedule
}