import mongoose from "mongoose";
import usersSchema from "./users-schema.js";
const usersModel = mongoose.model("users2", usersSchema);
export default usersModel;