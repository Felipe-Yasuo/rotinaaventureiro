import { Request, Response } from "express";
import { CompleteRoutineService } from "../../services/routine/CompleteRoutineService";

export class CompleteRoutineController {
    async handle(req: Request, res: Response) {
        const { routineId } = req.body;
        const userId = req.user.id;

        const service = new CompleteRoutineService();
        const result = await service.execute({ routineId, userId });

        return res.json(result);
    }
}
