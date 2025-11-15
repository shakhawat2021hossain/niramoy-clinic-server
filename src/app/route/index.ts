import { Router } from "express"
import app from "../../app"
import { userRoutes } from "../modules/user/user.route"
import { authRoutes } from "../modules/auth/auth.route"


export const router = Router()


const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/auth',
        route: authRoutes
    },
]

moduleRoutes.forEach(route => app.use(route.path, route.route))