import type { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { scheduleServices } from "./schedule.service"
import type { JwtPayload } from "jsonwebtoken"
import { paginate } from "../../utils/paginate"

const schedule = catchAsync(async (req: Request, res: Response) => {

    const result = await scheduleServices.createSchedules(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "schedules"
    })

})


const getAvailableSchedulesForDoctor = catchAsync(async (req: Request, res: Response) => {
    const queryParams = paginate(req.query)
    console.log(queryParams)

    const result = await scheduleServices.getAvailableSchedulesForDoctor(req.user as JwtPayload, queryParams)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "Available schedules for the dr"
    })

})

export const scheduleControllers = {
    schedule,
    getAvailableSchedulesForDoctor
}