import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    database_url: process.env.DATABASE_URL as string,
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    salt: process.env.SALT,
    cloud_name: process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET as string,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET as string,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY as string,

}