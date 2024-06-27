import connectDB from "../../lib/mongodb";
import Habit from "../../models/Habit";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    const { habitId, date, status } = req.body;

    try {
      const habit = await Habit.findById(habitId);
      if (!habit) {
        return res.status(404).json({ error: "Habit not found" });
      }

      const statusIndex = habit.status.findIndex(s => s.date.toISOString().split('T')[0] === date);
      if (statusIndex > -1) {
        habit.status[statusIndex].value = status;
      } else {
        habit.status.push({ date: new Date(date), value: status });
      }

      // Update streak and totalCompletions
      let currentStreak = 0;
      let totalCompletions = 0;
      habit.status.sort((a, b) => b.date - a.date);

      for (const s of habit.status) {
        if (s.value === "done") {
          currentStreak++;
          totalCompletions++;
        } else {
          break;
        }
      }

      habit.streak = currentStreak;
      habit.totalCompletions = totalCompletions;

      await habit.save();
      res.status(200).json(habit);
    } catch (error) {
      res.status(500).json({ error: "Failed to update habit status" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}