import { Request, Response } from "express";
import { GetRankingService } from "../../services/user/GetRankingService";

export class GetRankingController {
    async handle(req: Request, res: Response) {
        const service = new GetRankingService();
        const ranking = await service.execute();

        return res.json(ranking);
    }
}
