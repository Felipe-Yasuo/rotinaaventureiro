import { prisma } from "../../prisma";

interface CompleteRequest {
    routineId: string;
    userId: string;
}

export class CompleteRoutineService {
    async execute({ routineId, userId }: CompleteRequest) {
        const routine = await prisma.routine.findFirst({
            where: { id: routineId, userId },
        });

        if (!routine) throw new Error("Rotina não encontrada.");
        if (routine.completed) throw new Error("Rotina já concluída.");


        await prisma.routine.update({
            where: { id: routine.id },
            data: { completed: true },
        });


        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("Usuário não encontrado.");


        let newXp = user.xp + routine.xpReward;
        let newMoney = user.money + routine.moneyReward;
        let newLevel = user.level;


        let xpNeeded = newLevel * 100;

        while (newXp >= xpNeeded) {
            newXp -= xpNeeded;
            newLevel++;
            newMoney += 50;
            xpNeeded = newLevel * 100;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                xp: newXp,
                money: newMoney,
                level: newLevel,
            },
        });

        return {
            message: `Rotina concluída! ${newLevel > user.level ? "Level Up! 🔥" : ""}`,
            user: updatedUser,
        };
    }
}
