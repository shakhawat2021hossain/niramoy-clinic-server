import { Router } from "express"
import { drControllers } from "./doctor.controller"
import { checkAuth } from "../../middleware/checkAuth"
import { Role } from "../user/user.interface"

const router =  Router()
router.get('/get-all', drControllers.getAllDr)
router.patch('/update/:id', checkAuth(Role.DOCTOR), drControllers.updateDr)
export const drRoutes = router