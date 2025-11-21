import { Router, type NextFunction, type Request, type Response } from "express";
import { specialityControllers } from "./speciality.controller";
import { fileUploader } from "../../utils/fileUpload";
import { createSpecialityZodSchema } from "./speciality.validation";

const router = Router()

router.post(
    '/create',
    fileUploader.upload.single('file'),
    (req: Request, res: Response, next: NextFunction) => {
        req.body = createSpecialityZodSchema.parse(JSON.parse(req.body.data))
        return specialityControllers.createSpeciality(req, res, next)
    }

)
router.get('/get-all', specialityControllers.getAllSpeciality)

export const specialityRoutes = router