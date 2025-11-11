import { Router } from "express";
import { prisma } from "./prisma";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

const createUser = new CreateUserController();
const authUser = new AuthUserController();

router.post("/users", (req, res) => createUser.handle(req, res));
router.post("/session", (req, res) => authUser.handle(req, res));


router.get("/me", isAuthenticated, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    return res.json(user);
});

export { router };
