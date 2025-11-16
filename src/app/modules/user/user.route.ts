import { Router } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../utils/fileUpload";

const router = Router()

router.post('/create-patient',
    fileUploader.upload.single('file'),
    userController.createPatient
)

export const userRoutes = router