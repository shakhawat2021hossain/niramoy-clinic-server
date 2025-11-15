import { Server } from 'http';
import app from './app';
import { prisma } from './app/utils/prisma';
import envVars from './app/config/envVars';

const connectDB = async () =>{
    try{
        await prisma.$connect()
        console.log("DB connected successfully")
    }
    catch(error){
        console.log("DB connection failed")
        process.exit(1)

    }
}


async function bootstrap() {
    // This variable will hold our server instance
    let server: Server;

    try {
        await connectDB()
        // Start the server
        server = app.listen(envVars.port, () => {
            console.log(`🚀 Server is running on http://localhost:${envVars.port}`);
        });

        // Function to gracefully shut down the server
        const exitHandler = () => {
            if (server) {
                server.close(() => {
                    console.log('Server closed gracefully.');
                    process.exit(1); // Exit with a failure code
                });
            } else {
                process.exit(1);
            }
        };

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (error) => {
            console.log('Unhandled Rejection is detected, we are closing our server...');
            if (server) {
                server.close(() => {
                    console.log(error);
                    process.exit(1);
                });
            } else {
                process.exit(1);
            }
        });
    } catch (error) {
        console.error('Error during server startup:', error);
        process.exit(1);
    }
}

bootstrap();