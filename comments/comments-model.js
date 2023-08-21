import mongoose from "mongoose";
import commentsSchema from "./comment-schema.js";
const commentsModel = mongoose.model("Comments", commentsSchema);
export default commentsModel;