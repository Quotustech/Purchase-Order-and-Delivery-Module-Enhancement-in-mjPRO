

import { Router } from "express";
import { tracking } from "../../../controllers/v1/tracking.controller";
import { tciscrap } from "../../../controllers/v1/tciScrap.controller";

const router = Router();

router.route("/track/:track_id").get((req, res, next) => {
    const { track_id } = req.params;
    (req as any).id = track_id;
    const { courierNameEN } = req.query;

    if (courierNameEN === "tciExpress") {
        tciscrap(req, res, next);
    } else {
        tracking(req, res, next);
    }
});

export default router;
