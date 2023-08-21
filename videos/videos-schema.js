import mongoose from "mongoose";

const videosSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    likes: [{ type: String}],
    comments: [{ type: String}]
}, { collection: "videos" });
export default videosSchema;