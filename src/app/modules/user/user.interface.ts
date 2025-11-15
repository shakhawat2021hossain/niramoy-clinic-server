export interface IUser {
    name: string;
    email: string;
    password: string;
    role: "PATIENT" | "DOCTOR" | "ADMIN"
}