import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { drScheduleControllers } from "./drSchedules.controller";

const router = Router()

router.post('/',
    checkAuth(Role.DOCTOR),
    drScheduleControllers.addSchedule

)

export const drScheduleRoutes = router

