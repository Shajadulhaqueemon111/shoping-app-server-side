import express, { Request, Response } from "express";
const app = express();
import cors from "cors";
import router from "./app/router";

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
