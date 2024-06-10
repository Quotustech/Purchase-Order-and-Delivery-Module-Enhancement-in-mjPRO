import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../utils/catchAsyncError";
import axiosInstance from "../../utils/axiosInstance";

const trackingApiUrl: string = process.env.TRACKING_API_TRACK_URL || (() => { throw new Error("TRACKING_API_TRACK_URL is not defined in environment variables"); })();
const   registerApiUrl: string = process.env.TRACKING_API_REGISTER_URL || (() => { throw new Error("TRACKING_API_REGISTER_URL is not defined in environment variables"); })();

const trackingParcel = async (trackId:string)=>{
  const response = await axiosInstance.post(trackingApiUrl, {
    trackNos: [trackId]
  });
  
  return response.data;
}

const registerParcel = async (trackId: string) => {
  const response = await axiosInstance.post(registerApiUrl, [
    { trackNo: trackId }  // Correctly define the object inside the array
  ]);

  return response.data;
}

export const tracking = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {

try {
  const response = await trackingParcel(req.params.track_id)
  
  if(response.data.rejected.length === 0){
    return res.status(200).json({
      status: "success",
      message: "Information received succesfully.",
      data: response
    })
  }

  else{
   const response = await registerParcel(req.params.track_id);
   console.log("registered data" , response);                 
   if(response.data.rejected.length === 0){
    const response = await trackingParcel(req.params.track_id);
    console.log("data after registration: " , response)
    
    return res.status(200).json({
      status: "success",
      message: "Information received succesfully.",
      data: response
    })
  //  const timeOut = setTimeout(async()=>{
  //   const response = await trackingParcel(req.params.track_id);
  //   console.log("data after registration: " , response)
  //   clearTimeout(timeOut);
  //   return res.status(200).json({
  //     status: "success",
  //     message: "Information received succesfully.",
  //     data: response
  //   })
  //  }, 0)
   }
  }
} catch (err) {
  console.error(err);
  next(err);  // Pass the error to the next middleware
}
});
