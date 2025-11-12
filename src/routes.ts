import { Router } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateRoutineController } from "./controllers/routine/CreateRoutineController";
import { ListUserRoutinesController } from "./controllers/routine/ListUserRoutinesController";
import { GetRoutineStatsController } from "./controllers/routine/GetRoutineStatsController";
import { CompleteRoutineController } from "./controllers/routine/CompleteRoutineController";
import { GetRankingController } from "./controllers/user/GetRankingController";
import { FollowUserController } from "./controllers/friendship/FollowUserController";
import { GetFriendsFeedController } from "./controllers/friendship/GetFriendsFeedController";
import { ListItemsController } from "./controllers/item/ListItemsController";
import { BuyItemController } from "./controllers/item/BuyItemController";
import { ListInventoryController } from "./controllers/item/ListInventoryController";

const router = Router();

const getRanking = new GetRankingController();
const createUser = new CreateUserController();
const authUser = new AuthUserController();
const listUserRoutines = new ListUserRoutinesController();
const getRoutineStats = new GetRoutineStatsController();
const createRoutine = new CreateRoutineController();
const completeRoutine = new CompleteRoutineController();
const followUser = new FollowUserController();
const getFriendsFeed = new GetFriendsFeedController();
const listItems = new ListItemsController();
const buyItem = new BuyItemController();
const listInventory = new ListInventoryController();

// ======= AUTH =======
router.post("/users", (req, res) => createUser.handle(req, res));
router.post("/session", (req, res) => authUser.handle(req, res));

// ======= ROUTINES =======
router.post("/routines", isAuthenticated, (req, res) => createRoutine.handle(req, res));
router.put("/routines/complete", isAuthenticated, (req, res) => completeRoutine.handle(req, res));
router.get("/routines", isAuthenticated, (req, res) => listUserRoutines.handle(req, res));
router.get("/routines/stats", isAuthenticated, (req, res) => getRoutineStats.handle(req, res));


// ======= SOCIAL =======
router.post("/friends/follow", isAuthenticated, (req, res) => followUser.handle(req, res));
router.get("/friends/feed", isAuthenticated, (req, res) => getFriendsFeed.handle(req, res));

// ======= RANKING =======
router.get("/ranking", isAuthenticated, (req, res) => getRanking.handle(req, res));

// ======= SHOP =======
router.get("/shop", isAuthenticated, (req, res) => listItems.handle(req, res));
router.post("/shop/buy", isAuthenticated, (req, res) => buyItem.handle(req, res));

// ======= INVENTORY =======
router.get("/inventory", isAuthenticated, (req, res) => listInventory.handle(req, res));

// ======= HEALTH CHECK / TEST =======
router.get("/ping", (req, res) => {
    return res.json({ message: "pong" });
});

export { router };
