import { Router } from "express";
import { tracking } from "../../../controllers/v1/tracking.controller";
import { tciscrap } from "../../../controllers/v1/tciScrap.controller";
const router = Router();

router.route("/track/:track_id").get((req, res) => {

    (req as any).controller(req, res);
});


export default router;