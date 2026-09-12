import { Request, Response } from 'express';
import { AppDataSource } from '../database/dataSource';
import { User } from '../entities/User';
import { comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

export class AuthController {
    async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;

        if (!email || !senha) {
            throw new AppError("E-mail e senha são obrigatórios", 400);
        }

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { email },
            select: ["id", "nome", "email", "senha", "perfil"],
        });

        if (!user) {
            throw new AppError("E-mail ou senha inválidos", 401);
        }

        const isPasswordValid = await comparePassword(senha, user.senha);
        if (!isPasswordValid) {
            throw new AppError("E-mail ou senha inválidos", 401);
        }

        const token = generateToken({
            id: user.id,
            perfil: user.perfil,
        });

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
        });
    }
}