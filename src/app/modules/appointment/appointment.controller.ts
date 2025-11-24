import type { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { appointmentServices } from "./appointment.service"
import type { JwtPayload } from "jsonwebtoken"

const createAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await appointmentServices.createAppointment(req.user as JwtPayload, req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: "Created an appointment successfully!",
        success: true,
        data: result
    })
})
export const appointmentControllers = {
    createAppointment
}