import { Request, Response } from "express";
import { BuyItemService } from "../../services/item/BuyItemService";

export class BuyItemController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;
        const { itemId } = req.body;

        const service = new BuyItemService();
        const result = await service.execute({ userId, itemId });

        return res.status(201).json(result);
    }
}

