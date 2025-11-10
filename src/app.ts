import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });

    next();
});

app.use(router);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("🔥 Erro capturado:", err);

    if (err instanceof Error) {
        return res.status(400).json({ status: "error", message: err.message });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
});

export { app };
