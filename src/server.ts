import express, { Request, Response } from "express";
import router from "./routes/artilceRoutes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to blogging platform api",
  });
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
