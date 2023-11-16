import cloudinary from "../config/cloudinary.js";

export const generateSignature=(req, res, next)=>{
    try{
        const timestamp = Math.round((new Date).getTime()/1000),
                signature = cloudinary.utils.api_sign_request({
                timestamp
              },process.env.CLOUDINARY_API_SECRET);

        res.status(200).json({timestamp, signature})
    }catch(error){
        console.log(`ee:${error}`)
        res.status(500);
        next(error);
    }

}