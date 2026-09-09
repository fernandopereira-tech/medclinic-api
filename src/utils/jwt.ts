import jwt from 'jsonwebtoken';

export interface TokenPayload {
    id: string;
    perfil: string;
}

export const generateToken = (payload: TokenPayload): string => {
    const secret = process.env.JWT_SECRET || "default_secret";
    return jwt.sign(payload, secret, { expiresIn: "1d" });
};

export const verifyToken = (token: string): TokenPayload => {
    const secret = process.env.JWT_SECRET || "default_secret";
    return jwt.verify(token, secret) as TokenPayload;
};