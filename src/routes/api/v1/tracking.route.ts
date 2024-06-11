
// // import { Router, Request, Response } from "express";
// // import { tracking } from "../../../controllers/v1/tracking.controller";
// // import { tciscrap } from "../../../controllers/v1/tciScrap.controller";
// // const router = Router();
// // interface CustomRequest extends Request {
// //     controller?: any;
// // }

// // router.route("/track/:track_id").get((req, res) => {
// //     console.log("function triggred")
// //     //@ts-ignore
// //     // const { id } = req.params;
// //     const { courierNameEN } = (req as any).query;
// //     console.log("printing the courier name")
// //     console.log(courierNameEN)
// //     if (courierNameEN === "tciExpress") {
// //         (req as any).controller = tciscrap;
// //     } else {
// //         (req as any).controller = tracking;
// //     }
// // });
// // router.route("/track/:track_id").get((req: CustomRequest, res: Response) => {
// //     console.log("function triggered");
// //     const { courierNameEN } = req.query;
// //     console.log("printing the courier name");
// //     console.log(courierNameEN);
// //     if (courierNameEN === "tciExpress") {
// //         req.controller = tciscrap;
// //     } else {
// //         req.controller = tracking;
// //     }
// // });



// // export default router;





// import { Router, Request, Response } from "express";
// import { tracking } from "../../../controllers/v1/tracking.controller";
// import { tciscrap } from "../../../controllers/v1/tciScrap.controller";

// // Define a custom Request interface to include the 'controller' property
// interface CustomRequest extends Request {
//     controller?: any;
// }

// const router = Router();

// router.route("/track/:track_id").get(async (req: CustomRequest, res: Response) => {
//     console.log("function triggered");
//     const { courierNameEN } = req.query;
//     console.log("printing the courier name");
//     console.log(courierNameEN);
//     if (courierNameEN === "tciExpress") {
//         req.controller = tciscrap;
//     } else {
//         req.controller = tracking;
//     }

//     try {
//         if (req.controller) {
//             // Assuming the controller is a function that returns a promise
//             const result = await req.controller(req.params.track_id);
//             // Send the result back as response
//             res.status(200).json(result);
//         } else {
//             // Handle case where controller is not set
//             res.status(404).json({ error: "Controller not found" });
//         }
//     } catch (error) {
//         // Handle any errors that occur during controller execution
//         console.error("Error:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// export default router;

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
