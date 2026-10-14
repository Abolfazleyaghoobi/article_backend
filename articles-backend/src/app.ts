
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env";
import { errorMiddleware } from "./common/middleware/error.middleware";
import { notFoundMiddleware } from "./common/middleware/not-found.middleware";
import { apiRouter } from "./routes";
import { appConfig } from "./config/app.config";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Articles Backend API is running 🚀"+`${env.PORT}`);
});
app.use(appConfig.apiPrefix, apiRouter);

// اگر مسیری پیدا نشد، خطای 404 ایجاد می‌شود.
app.use(notFoundMiddleware);

// مدیریت خطاها باید بعد از مسیرها قرار بگیرد.
app.use(errorMiddleware);
export default app;
