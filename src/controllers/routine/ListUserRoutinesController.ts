import { Request, Response } from "express";
import { prisma } from "../../prisma";

export class ListUserRoutinesController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;
        const routines = await prisma.routine.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return res.json(routines);
    }
}
