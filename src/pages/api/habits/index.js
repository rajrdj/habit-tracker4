import connectDB from "../../../lib/mongodb";
import Habit from "../../../models/Habit";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const habits = await Habit.find();
      res.status(200).json(habits);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch habits" });
    }
  } else if (req.method === "POST") {
    try {
      const habit = await Habit.create(req.body);
      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ error: "Failed to create habit" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}