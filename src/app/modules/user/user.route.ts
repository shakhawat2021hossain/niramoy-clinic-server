import { Router, type NextFunction, type Request, type Response } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../utils/fileUpload";
import { validateReq } from "../../middleware/validateReq";
import { createPatientZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";

const router = Router()

router.post(
    '/create-patient',
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log("abc", req.body)
        req.body = createPatientZodSchema.parse(JSON.parse(req.body.data))
        return userController.createPatient(req, res, next)
    }
)

router.get(
    '/',
    checkAuth(Role.PATIENT),
    userController.getAllUser)

export const userRoutes = router