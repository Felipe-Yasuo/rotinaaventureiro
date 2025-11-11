import { Request, Response } from "express";
import { ListItemsService } from "../../services/item/ListItemsService";

export class ListItemsController {
    async handle(req: Request, res: Response) {
        const service = new ListItemsService();
        const items = await service.execute();
        return res.json(items);
    }
}