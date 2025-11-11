import { Request, Response } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Usuário não encontrado.");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Senha incorreta.");

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                xp: user.xp,
                money: user.money,
                level: user.level,
            },
        });
    }
}

