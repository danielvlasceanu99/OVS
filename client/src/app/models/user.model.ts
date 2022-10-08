export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    password?: string;
    roles?: Role[];
    locked?: boolean;
    enabled?: boolean;
    resetToken?: string;
}

export interface LoginUser{
    username: string;
    password: string;
}

export interface LoginResponse{
    jwt: string;
    refreshToken: string;
    id: number;
    email: string;
    roles: Role[];
}

export interface Role{
    id: number;
    name:UserRole;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}