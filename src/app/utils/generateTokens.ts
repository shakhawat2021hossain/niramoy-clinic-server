import jwt from "jsonwebtoken"
import type { IUser } from "../modules/user/user.interface"
import envVars from "../config/envVars"

export const generateTokens = (user: Partial<IUser>) => {
    const accessToken = jwt.sign(user, envVars.access_token_secret, { expiresIn: '1d' })
    const refreshToken = jwt.sign(user, envVars.refresh_token_secret, { expiresIn: '7d' })

    return {
        accessToken,
        refreshToken
    }

}