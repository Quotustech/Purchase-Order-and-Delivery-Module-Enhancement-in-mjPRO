import { Router } from "express";
import trackingRoute from "./tracking.route";

const router = Router();

router.use("/", trackingRoute);

export default router;
