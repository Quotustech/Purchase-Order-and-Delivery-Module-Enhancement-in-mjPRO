
import { NextFunction, Request, Response } from "express";
//@ts-ignore


export const checkRoute = (req: Request, res: Response, next: NextFunction) => {
console.log("function trigger")
    //@ts-ignore
    const {id}  = req.params;
    const { q } = req.query;
    console.log("printing form the checkroutes");
    console.log(id)
    //@ts-ignore
    if (q === true) {
        res.redirect(`/${id}`)
    }
    else {
        next();
    }
}
