export interface IManagers {
    _id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate?: Date;
    hireDate: Date;
    salary: number;
    image?: string;
    role: string;
    activated?: Boolean;
    lastLoginTime?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
