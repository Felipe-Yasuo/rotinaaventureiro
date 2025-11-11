import { prisma } from "../../prisma";

export class ListItemsService {
    async execute() {
        const items = await prisma.item.findMany({
            orderBy: { price: "asc" },
        });

        return items;
    }
}