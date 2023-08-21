import mongoose from "mongoose";
import videosSchema from "./videos-schema.js";
const videosModel = mongoose.model("Videos", videosSchema);
export default videosModel;