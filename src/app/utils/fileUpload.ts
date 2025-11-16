import multer from 'multer';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import envVars from '../config/envVars';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(process.cwd(), "/uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

const uploadToCloudinary = async (file: Express.Multer.File) => {
    // Configuration
    cloudinary.config({
        cloud_name: envVars.cloud_name,
        api_key: envVars.cloudinary_api_key,
        api_secret: envVars.cloudinary_api_secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            file.path, {
            public_id: file.filename,
        })
    return uploadResult;

}

export const fileUploader = {
    upload,
    uploadToCloudinary
}


/*
multer- for file upload
cloudinary- storing uploaded file

img => multer => working dir
working dir(img) => cloudinary
*/