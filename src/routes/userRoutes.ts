import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", userController.create);

userRoutes.get("/users/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Acesso autorizado com sucesso",
        usuarioLogado: req.user,
    });
});

userRoutes.get("/admin/ping", authMiddleware, roleMiddleware(["admin"]), (req, res) => {
    return res.status(200).json({
        message: "Acesso autorizado ao painel administrativo",
        usuarioLogado: req.user,
    });
});

export { userRoutes };
