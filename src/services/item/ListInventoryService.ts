import { prisma } from "../../prisma";

export class ListInventoryService {
    async execute(userId: string) {
        const inventory = await prisma.userItem.findMany({
            where: { userId },
            include: {
                item: {
                    select: { id: true, name: true, price: true, imageUrl: true },
                },
            },
        });

        return inventory.map((entry) => entry.item);
    }
}