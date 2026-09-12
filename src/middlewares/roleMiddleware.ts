import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../entities/UserRole';

export const roleMiddleware = (allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): Response | void => {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }

        const { perfil } = req.user;
        if (!allowedRoles.includes(perfil)) {
            return res.status(403).json({
                message: "Acesso negado: você não tem permissão para acessar este recurso",
            });
        }

        return next();
    };
};