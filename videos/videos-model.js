import mongoose from "mongoose";
import videosSchema from "./videos-schema";
const videosModel = mongoose.model("Videos", videosSchema);
export default videosModel;