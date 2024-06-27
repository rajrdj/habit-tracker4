import { Box } from "@chakra-ui/react";
import HabitList from "../components/HabitList";

export default function Home() {
  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <HabitList />
    </Box>
  );
}