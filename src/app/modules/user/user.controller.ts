import type { Request, Response } from "express";
import { userServices } from "./user.service";
import httpStatus from "http-status-codes"
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Role, Status, type IGetUsers, type IOtherParams } from "./user.interface";
import { paginate, type IPaginateOp } from "../../utils/paginate";

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


const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await userServices.createAdmin(req)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        data: result,
        success: true,
        message: "Admin account created successfully"
    })

})


const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const {
        // page = 1,
        // limit = 10,
        // sortBy = "createdAt",
        // sortOrder = "asc",
        search = "",
        role,
        status,
    } = req.query;

    // const queryParams: IGetUsers = {
    //     page: Number(page),
    //     limit: Number(limit),
    //     searchTerm: String(search),
    //     sortBy: String(sortBy),
    //     sortOrder: String(sortOrder),
    // };
    

    const queryParams = paginate(req.query)


    const otherParams: IOtherParams = {
        searchTerm: String(search)
    };
    
    if (Object.values(Role).includes(role as Role)) {
        otherParams.role = role as Role;
    }
    
    if (Object.values(Status).includes(status as Status)) {
        otherParams.status = status as Status;
    }
    
    console.log("oparams", otherParams)
    const result = await userServices.getAllUser(queryParams, otherParams);

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
    createDoctor,
    createAdmin
}