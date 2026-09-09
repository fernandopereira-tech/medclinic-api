import { Request, Response } from 'express';
import { AppDataSource } from '../database/dataSource';
import { User } from '../entities/User';
import { comparePassword } from '../utils/password';
import jwt from 'jsonwebtoken';

export class AuthController {
    async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "E-mail ou senha inválidos" });
        }

        const isPasswordValid = await comparePassword(senha, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "E-mail ou senha inválidos" });
        }

        const secret = process.env.JWT_SECRET || "default_secret";
        const token = jwt.sign(
            { id: user.id, perfil: user.perfil },
            secret,
            { expiresIn: "1d"}
        );

        return res.status(200).json({
            message: "Login realizado com sucesso!",
            token,
        });
    }
}