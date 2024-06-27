import { useState } from "react";
import axios from "axios";
import { Box, Text, HStack, Button, VStack, useToast } from "@chakra-ui/react";
import HabitChart from "./HabitChart";

const HabitItem = ({ habit, onUpdate, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const toast = useToast();

  const updateStatus = async (date, status) => {
    try {
      await axios.post("/api/updateStatus", {
        habitId: habit._id,
        date,
        status,
      });
      onUpdate();
    } catch (error) {
      console.error("Failed to update habit status:", error);
      toast({
        title: "Error",
        description: "Failed to update habit status.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteHabit = async () => {
    try {
      await axios.delete(`/api/habits/${habit._id}`);
      onDelete(habit._id);
      toast({
        title: "Habit deleted",
        description: "The habit has been successfully deleted.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to delete habit:", error);
      toast({
        title: "Error",
        description: "Failed to delete habit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const getLastSevenDays = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      return date.toISOString().split("T")[0];
    });
  };

  const getStatus = (date) => {
    const statusObj = habit.status.find(
      (s) => s.date.split("T")[0] === date
    );
    return statusObj ? statusObj.value : "none";
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4}>
      <HStack justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          {habit.name}
        </Text>
        <HStack>
          <Button onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide" : "Show"} Details
          </Button>
          <Button colorScheme="red" onClick={deleteHabit}>
            Delete
          </Button>
        </HStack>
      </HStack>
      {expanded && (
        <VStack align="stretch" mt={4}>
          <Text>
            Streak: {habit.streak} | Total Completions: {habit.totalCompletions}
          </Text>
          <HabitChart habit={habit} />
          {getLastSevenDays().map((date) => (
            <HStack key={date} justifyContent="space-between">
              <Text>{new Date(date).toLocaleDateString()}</Text>
              <HStack>
                <Button
                  size="sm"
                  colorScheme={getStatus(date) === "done" ? "green" : "gray"}
                  onClick={() => updateStatus(date, "done")}
                >
                  Done
                </Button>
                <Button
                  size="sm"
                  colorScheme={getStatus(date) === "not done" ? "red" : "gray"}
                  onClick={() => updateStatus(date, "not done")}
                >
                  Not Done
                </Button>
                <Button
                  size="sm"
                  colorScheme={getStatus(date) === "none" ? "blue" : "gray"}
                  onClick={() => updateStatus(date, "none")}
                >
                  None
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default HabitItem;