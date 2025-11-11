import { Request, Response } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";

export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            throw new Error("Preencha todos os campos.");

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) throw new Error("Usuário já existe.");

        const hash = await bcrypt.hash(password, 8);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                xp: true,
                money: true,
                level: true,
                createdAt: true,
            },
        });

        return res.status(201).json(user);
    }
}

