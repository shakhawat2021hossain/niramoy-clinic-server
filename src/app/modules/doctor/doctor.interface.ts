import { Gender } from "@prisma/client";

export type IDoctorUpdateIp = {
    email: string;
    contactNumber: string;
    gender: Gender;
    appointmentFee: number;
    name: string;
    address: string;
    registrationNumber: string;
    experience: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    isDeleted: boolean;
    specialities: {
        specialtyId: string;
        isDeleted?: boolean;
    }[]
}

