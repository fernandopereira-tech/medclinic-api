import jwt from 'jsonwebtoken';
import { UserRole } from '../entities/UserRole';

export interface TokenPayload {
    id: string;
    perfil: UserRole;
}

export const generateToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não está definida nas variáveis de ambiente.");
    }
    return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string): TokenPayload => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET não está definida nas variáveis de ambiente.");
    }
    return jwt.verify(token, secret) as TokenPayload;
};