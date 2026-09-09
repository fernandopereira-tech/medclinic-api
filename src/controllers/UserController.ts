import { Request, Response } from "express";
import { AppDataSource } from "../database/dataSource";
import { User } from "../entities/User";
import { UserRole } from "../entities/UserRole";
import { hashPassword } from "../utils/password";

export class UserController {
    async create(req: Request, res: Response): Promise<Response> {
        const { nome, email, senha, perfil } = req.body;

const userRepository = AppDataSource.getRepository(User);

const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "E-mail já cadastrado no sistema" });
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