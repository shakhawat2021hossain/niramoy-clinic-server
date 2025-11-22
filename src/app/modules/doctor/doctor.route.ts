import { Router } from "express"
import { drControllers } from "./doctor.controller"

const router =  Router()
router.get('/get-all', drControllers.getAllDr)
export const drRoutes = router