import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";
import Video from "../models/Video.js"

export const upload = async (req, res, next) => {
  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        public_id: req.body.public_id,
        version: req.body.version,
      },
      process.env.CLOUDINARY_API_SECRET
    )

    if (signature === req.body.signature) {
      // console.log('t1')
      if(req.body.response.resource_type === "video"){
        const newVideo = {
          public_id: req.body.public_id,
          secure_url: req.body.response.secure_url,
          playback_url: req.body.response.playback_url,
          width: req.body.response.width,
          height: req.body.response.height,
          format: req.body.response.format,
          resource_type: req.body.response.resource_type,
          folder: req.body.response.folder,
          duration: req.body.response.duration,
          created_at: req.body.response.created_at,
        }

        const result = await Video.create(newVideo);
        res.status(200).json(result)
      }else if (req.body.response.resource_type === 'image') {
        // console.log('t2')
        const newImage = {
          public_id: req.body.public_id,
          secure_url: req.body.response.secure_url,
          width: req.body.response.width,
          height: req.body.response.height,
          format: req.body.response.format,
          resource_type: req.body.response.resource_type,
          folder: req.body.response.folder,
          created_at: req.body.response.created_at,
        }

        const result = await Image.create(newImage)
        res.status(200).json(result)
      }
    }
  } catch (error) {
    console.log(`e:${error}`)
    res.status(500)
    next(error)
  }
}
