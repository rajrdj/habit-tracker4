import { useState } from "react";
import { Input, Button, HStack } from "@chakra-ui/react";

const AddHabitForm = ({ onAdd }) => {
  const [habitName, setHabitName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) {
      onAdd(habitName);
      setHabitName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Enter a new habit"
        />
        <Button type="submit" colorScheme="blue">
          Add Habit
        </Button>
      </HStack>
    </form>
  );
};

export default AddHabitForm;