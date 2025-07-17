import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: String,
  user: String,
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "todos"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model("logs", logSchema);
export default Log;
