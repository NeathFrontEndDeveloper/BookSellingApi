export interface IUser {
    _id: string;
    name: string;
    user_name: string;
    password: string;
    phone?: string;
    email: string;
    role?: string;
}