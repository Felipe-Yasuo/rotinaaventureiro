import { Request, Response } from "express";
import { CreateRoutineService } from "../../services/routine/CreateRoutineService";

export class CreateRoutineController {
    async handle(req: Request, res: Response) {
        const { title, description, difficulty, imageUrl } = req.body;
        const userId = req.user.id; // vem do middleware JWT

        const service = new CreateRoutineService();
        const routine = await service.execute({
            title,
            description,
            difficulty,
            imageUrl,
            userId,
        });

        return res.status(201).json(routine);
    }
}
