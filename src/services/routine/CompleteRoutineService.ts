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


        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                xp: { increment: routine.xpReward },
                money: { increment: routine.moneyReward },
            },
        });

        return { message: "Rotina concluída com sucesso!", user };
    }
}
