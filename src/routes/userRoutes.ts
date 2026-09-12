import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { asyncHandler } from '../utils/asyncHandler';
import { UserRole } from '../entities/UserRole';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", asyncHandler(userController.create.bind(userController)));

userRoutes.get("/users/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Acesso autorizado com sucesso",
        usuarioLogado: req.user,
    });
});

userRoutes.get(
    "/admin/ping",
    authMiddleware,
    roleMiddleware([UserRole.ADMIN]),
    (req, res) => {
        return res.status(200).json({
            message: "Acesso autorizado ao painel administrativo",
            usuarioLogado: req.user,
        });
    }
);

export { userRoutes };