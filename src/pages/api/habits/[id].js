import connectDB from "../../../lib/mongodb";
import Habit from "../../../models/Habit";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const habit = await Habit.findById(id);
      if (!habit) {
        return res.status(404).json({ error: "Habit not found" });
      }
      res.status(200).json(habit);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch habit" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedHabit = await Habit.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedHabit) {
        return res.status(404).json({ error: "Habit not found" });
      }
      res.status(200).json(updatedHabit);
    } catch (error) {
      res.status(500).json({ error: "Failed to update habit" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedHabit = await Habit.findByIdAndDelete(id);
      if (!deletedHabit) {
        return res.status(404).json({ error: "Habit not found" });
      }
      res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete habit" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}