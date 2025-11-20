import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";


const router = Router()

router.post('/', scheduleControllers.schedule)

export const scheduleRoutes = router