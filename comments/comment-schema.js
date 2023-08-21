import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    videoId: { type: String, required: true, },
    text: {type: String},
    timestamp: {type: Date},
    authorId: {type: String}
}, { collection: "comments" });
export default commentsSchema;