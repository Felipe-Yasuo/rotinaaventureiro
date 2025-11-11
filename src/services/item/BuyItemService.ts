import { prisma } from "../../prisma";

interface BuyItemRequest {
    userId: string;
    itemId: string;
}

export class BuyItemService {
    async execute({ userId, itemId }: BuyItemRequest) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("Usuário não encontrado.");

        const item = await prisma.item.findUnique({ where: { id: itemId } });
        if (!item) throw new Error("Item não encontrado.");

        if (user.money < item.price) {
            throw new Error("Dinheiro insuficiente para comprar este item.");
        }


        const alreadyHas = await prisma.userItem.findFirst({
            where: { userId, itemId },
        });

        if (alreadyHas) {
            throw new Error("Você já possui este item.");
        }


        await prisma.userItem.create({
            data: { userId, itemId },
        });

        await prisma.user.update({
            where: { id: userId },
            data: { money: { decrement: item.price } },
        });

        await prisma.activity.create({
            data: {
                userId,
                action: "BOUGHT_ITEM",
                description: `${user.name} comprou "${item.name}" por ${item.price} moedas.`,
            },
        });

        return { message: "Compra realizada com sucesso!", item };
    }
}