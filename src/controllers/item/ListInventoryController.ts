import { Request, Response } from "express";
import { ListInventoryService } from "../../services/item/ListInventoryService";

export class ListInventoryController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;

        const service = new ListInventoryService();
        const inventory = await service.execute(userId);

        return res.json(inventory);
    }
}