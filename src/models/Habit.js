import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: [{
    date: { type: Date, required: true },
    value: { type: String, enum: ["done", "not done", "none"], default: "none" }
  }],
  streak: { type: Number, default: 0 },
  totalCompletions: { type: Number, default: 0 }
});

export default mongoose.models.Habit || mongoose.model("Habit", habitSchema);