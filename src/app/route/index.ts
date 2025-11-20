import { Router } from "express"
import { userRoutes } from "../modules/user/user.route"
import { authRoutes } from "../modules/auth/auth.route"
import { scheduleRoutes } from "../modules/schedule/schedule.route"
import { drScheduleRoutes } from "../modules/drSchedules/drSchedule.route"


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
    {
        path: '/schedule',
        route: scheduleRoutes
    },
    {
        path: '/dr-schedule',
        route: drScheduleRoutes
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))