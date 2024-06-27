import { useState, useEffect } from "react";
import axios from "axios";
import { Box, VStack, Heading } from "@chakra-ui/react";
import HabitItem from "./HabitItem";
import AddHabitForm from "./AddHabitForm";

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get("/api/habits");
      setHabits(response.data);
    } catch (error) {
      console.error("Failed to fetch habits:", error);
    }
  };

  const addHabit = async (habitName) => {
    try {
      await axios.post("/api/habits", { name: habitName });
      fetchHabits();
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit._id !== habitId));
  };

  return (
    <Box>
      <Heading mb={4}>Habit Tracker</Heading>
      <AddHabitForm onAdd={addHabit} />
      <VStack spacing={4} align="stretch" mt={4}>
        {habits.map((habit) => (
          <HabitItem 
            key={habit._id} 
            habit={habit} 
            onUpdate={fetchHabits} 
            onDelete={deleteHabit}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default HabitList;