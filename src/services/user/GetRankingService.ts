import { prisma } from "../../prisma";

export class GetRankingService {
    async execute() {
        const users = await prisma.user.findMany({
            orderBy: [
                { level: "desc" },
                { xp: "desc" },
            ],
            select: {
                id: true,
                name: true,
                level: true,
                xp: true,
                money: true,
            },
        });

        return users;
    }
}
