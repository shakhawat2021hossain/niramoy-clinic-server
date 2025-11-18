import type { IUser } from "../user/user.interface"
import bcrypt from "bcrypt"
import httpStatus from "http-status-codes"
import { prisma } from "../../utils/prisma"
import AppError from "../../utils/AppError"
import { generateTokens } from "../../utils/jwt"
import envVars from "../../config/envVars"

const login = async (payload: Partial<IUser>) => {
    // console.log(payload)
    const user = await prisma.user.findUniqueOrThrow({
        where: { email: payload.email }
    })
    console.log(user)
    const isMatched = await bcrypt.compare(payload.password as string, user.password)
    // console.log("matched", isMatched)

    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials")
    }

    const {accessToken, refreshToken} = generateTokens({email: user.email, role: user.role})

    return {
        accessToken, 
        refreshToken,
        passwordChange: user.needPasswordChange
    }
}

export const authServices = {
    login
}