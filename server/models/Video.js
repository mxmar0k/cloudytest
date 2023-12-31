import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
  public_id: {
    type: String,
    required: true,
  },
  secure_url: {
    type: String,
    required: true,
  },
  playback_url: String,
  width: Number,
  height: Number,
  format: String,
  resource_type: String,
  folder: String,
  duration: Number,
  created_at: String,
})

export default mongoose.model('Video', videoSchema)
