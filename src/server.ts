import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes/artilceRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.disable("x-powered-by");

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to blogging platform api",
  });
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
