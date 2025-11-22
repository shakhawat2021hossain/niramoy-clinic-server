import jwt from "jsonwebtoken"
import type { IUser } from "../modules/user/user.interface"
import envVars from "../config/envVars"
import type { User } from "@prisma/client"

export const generateTokens = (user: Partial<User>) => {
    const accessToken = jwt.sign(user, envVars.access_token_secret, { expiresIn: '1d' })
    const refreshToken = jwt.sign(user, envVars.refresh_token_secret, { expiresIn: '7d' })

    return {
        accessToken,
        refreshToken
    }

}

export const verifyToken = (token: string, secret: string) =>{
    const isVerified = jwt.verify(token, secret)
    return isVerified
}