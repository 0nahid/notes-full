import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send(`
    <h1 style="display:flex;justify-content: center;align-items: center; height: 100vh; "
    >
    Welcome to Notes Api Server
    </h1>
  `);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
