export interface IUser {
    name: string;
    email: string;
    password: string;
    role: Role
}

export enum Role {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR",
    ADMIN = "ADMIN"
}

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED"
}

export interface IGetUsers {
    page: number;
    limit: number;
    searchTerm: string;
    sortBy: string;
    sortOrder: string;
    role?: Role;
    status?: Status;
}

export interface IOtherParams {
    searchTerm: string;
    role?: Role;
    status?: Status
}