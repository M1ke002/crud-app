import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("All good, Response from server!!!!");
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
