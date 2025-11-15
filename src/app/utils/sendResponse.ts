import type { Response } from "express";

interface IResData<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T | null | undefined;

}

export const sendResponse = <T>(res: Response, resData: IResData<T>) =>{
    res.status(resData.statusCode).json({
        success: resData.success,
        message: resData.message,
        data: resData.data || null || undefined,
    })
}