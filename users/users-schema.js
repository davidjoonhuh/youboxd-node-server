import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "None" },
  lastName: { type: String, default: "None" },
  email: { type: String, default: "None" },
  role: {
    type: String,
    default: "User",
  }, // Other roles: Administrator
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'usersModel' }],
  liked: [String],
}, { collection: "users2" });
export default usersSchema;
