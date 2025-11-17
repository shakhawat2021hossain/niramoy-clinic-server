import type { Request, Response } from "express";
import { authServices } from "./auth.service";
import httpStatus from "http-status-codes"
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authServices.login(req.body)

    const {accessToken, refreshToken, passwordChange} = result

    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true, 
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    })
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true, 
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    // console.log(result)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Logged in successful",
        success: true,
        data: result
    })
})


export const authControllers = {
    login
} 