import { Router } from "express"
import app from "../../app"
import { userRoutes } from "../modules/user/user.route"


export const router = Router()


const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    }
]

moduleRoutes.forEach(route => app.use(route.path, route.route))