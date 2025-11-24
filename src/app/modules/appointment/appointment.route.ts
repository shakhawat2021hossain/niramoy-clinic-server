import { Router } from "express";
import { appointmentControllers } from "./appointment.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router()

router.post("/create", checkAuth(Role.PATIENT), appointmentControllers.createAppointment)

export const appointmentRoutes = router