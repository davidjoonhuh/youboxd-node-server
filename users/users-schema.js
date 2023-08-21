import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({
  _id:Number,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, default: "None" },
  lastName: { type: String, default: "None" },
  email: { type: String, default: "None" },
  phone: { type: String, default: "000-000-0000" },
  address: { type: String, default: "None" },
  role: {
    type: String,
    default: "Viewer",
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
}, { collection: "users" });
export default usersSchema;
