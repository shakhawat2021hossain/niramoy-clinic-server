import type { IUser } from "../user/user.interface"
import bcrypt from "bcrypt"
import httpStatus from "http-status-codes"
import jwt from "jsonwebtoken"
import { prisma } from "../../utils/prisma"
import AppError from "../../utils/AppError"

const login = async (payload: Partial<IUser>) => {
    // console.log(payload)
    const user = await prisma.user.findUniqueOrThrow({
        where: { email: payload.email }
    })
    // console.log(user)
    const isMatched = await bcrypt.compare(payload.password as string, user.password)
    // console.log("matched", isMatched)

    if (!isMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Invalid Credentials")
    }

    const token = jwt.sign(user, "secret", {expiresIn: '7d'})
    console.log(token)




}

export const authServices = {
    login
}