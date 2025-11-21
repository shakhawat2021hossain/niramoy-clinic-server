import { Router } from "express";
import { scheduleControllers } from "./schedule.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";


const router = Router()

router.post('/', scheduleControllers.schedule)
router.get('/available-schedules-for-dr', checkAuth(Role.DOCTOR), scheduleControllers.getAvailableSchedulesForDoctor)
router.delete('/delete-schedule/:id', scheduleControllers.deleteSchedule)

export const scheduleRoutes = router