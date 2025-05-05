import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import router from "./app/router";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorhandeller";
import notFound from "./app/middlewares/notFound";

app.use(express.json());
app.use(cors());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
//global error handeller
app.use(globalErrorHandler);

//not error handeller
app.use(notFound);
export default app;
