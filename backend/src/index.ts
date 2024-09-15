import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { initDB } from "./models";
import blogsRouter from "./routes/blog";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

//handle routes
app.use("/api/blogs", blogsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("All good, Response from server!!!!");
});

const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
};

startServer();
