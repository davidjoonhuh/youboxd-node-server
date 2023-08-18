import mongoose from "mongoose";
import commentsSchema from "./comment-schema";
const commentsModel = mongoose.model("Videos", commentsSchema);
export default commentsModel;