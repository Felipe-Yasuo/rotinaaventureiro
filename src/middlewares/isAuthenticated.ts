import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
    userId: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: "Token não informado." });

    const [, token] = authHeader.split(" ");

    try {
        const { userId } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as Payload;

        req.user = { id: userId };
        return next();
    } catch {
        return res.status(401).json({ error: "Token inválido." });
    }
}
