import type { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt"
import AppError from "../utils/AppError"
import httpStatus from "http-status-codes"
import envVars from "../config/envVars"
import type { JwtPayload } from "jsonwebtoken"

export const checkAuth = (...roles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.accessToken
            // console.log("checkauth", token, roles)

            if (!token) {
                throw new AppError(httpStatus.BAD_REQUEST, "No token found!")
            }

            const isVerified = await verifyToken(token, envVars.access_token_secret) as JwtPayload
            if(!roles.includes(isVerified.role)){
                throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized to access the route")
            }

            req.user = isVerified // req er moddhe user property add korchi, jekhane {email, role} ache
            next()
        }
        catch (error) {
            next(error)
        }
    }





