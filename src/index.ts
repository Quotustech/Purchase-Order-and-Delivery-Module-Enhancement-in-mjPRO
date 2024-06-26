import express, { NextFunction, Request, Response } from "express";
import customMorgan from "./utils/morgan_format";
import "dotenv/config";
import cors from "cors";
import apiRoutes from "./routes/api";
import ErrorHandler from "./utils/errorHandler";
import { ErrorMiddleware } from "./middlewares/error";


const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(customMorgan);


app.use("/api" , apiRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log("request recived")
  res.send("Hello, TypeScript with Express!");
});


app.use((req, res , next) => {
    console.log(`Received a request: ${req.method} ${req.url}`);
    const error = new ErrorHandler(`Cant find ${req.originalUrl} on the Server` , 404)
    next(error);
  });
  app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log("Tracking api : ", process.env.TRACKING_API_TOKEN);
  console.log("Tracking url : ",process.env.TRACKING_API_TRACK_URL);
});
