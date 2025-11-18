import type { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status-codes"
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Role, Status, type IGetUsers } from "./user.interface";

const createPatient = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.createPatient(req)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "User created successfully"
    })

})


const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.createDoctor(req)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "Doctor account created successfully"
    })

})


const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const {
        page = 1,
        limit = 10,
        search = "",
        sortBy = "createdAt",
        sortOrder = "asc",
        role,
        status,
    } = req.query;

    const queryParams: IGetUsers = {
        page: Number(page),
        limit: Number(limit),
        searchTerm: String(search),
        sortBy: String(sortBy),
        sortOrder: String(sortOrder),
    };
    
    
    if (Object.values(Role).includes(role as Role)) {
        queryParams.role = role as Role;
    }
    
    
    if (Object.values(Status).includes(status as Status)) {
        queryParams.status = status as Status;
    }
    
    console.log("qparams", queryParams)
    const result = await userServices.getAllUser(queryParams);

    sendResponse(res, {
        statusCode: httpStatus.ACCEPTED,
        data: result,
        success: true,
        message: "User retrieved successfully",
    });
});

export const userController = {
    createPatient,
    getAllUser,
    createDoctor
}