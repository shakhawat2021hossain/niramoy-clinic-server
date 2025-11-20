import type { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { scheduleServices } from "./schedule.service"

const schedule = catchAsync(async (req: Request, res: Response) => {

    const result = await scheduleServices.createSchedules(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "schedules"
    })

})
export const scheduleControllers = {
    schedule
}