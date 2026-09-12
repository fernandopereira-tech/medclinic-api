import { Request, Response } from "express";
import { AppDataSource } from "../database/dataSource";
import { User } from "../entities/User";
import { UserRole } from "../entities/UserRole";
import { hashPassword } from "../utils/password";
import { AppError } from "../utils/AppError";

export class UserController {
    async create(req: Request, res: Response): Promise<Response> {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha) {
            throw new AppError("Nome, e-mail e senha são obrigatórios", 400);
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new AppError("Formato de e-mail inválido", 400);
        }

        if (senha.length < 6) {
            throw new AppError("A senha deve ter pelo menos 6 caracteres", 400);
        }

        if (perfil && !Object.values(UserRole).includes(perfil)) {
            throw new AppError("Perfil inválido. Use 'admin' ou 'attendant'", 400);
        }

        const userRepository = AppDataSource.getRepository(User);

        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new AppError("E-mail já cadastrado no sistema", 409);
        }

        const hashedPassword = await hashPassword(senha);

        const user = userRepository.create({
            nome,
            email,
            senha: hashedPassword,
            perfil: perfil || UserRole.ATTENDANT,
        });

        await userRepository.save(user);

        const { senha: _, ...userWithoutPassword } = user;

        return res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: userWithoutPassword,
        });
    }
}