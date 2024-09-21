"use client";

import {
  Box,
  Flex,
  Input,
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  useColorModeValue,
  VStack,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

interface Task {
  id: number;
  text: string;
  isCompleted: boolean;
}

const AddTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const inputBg = useColorModeValue("white", "gray.600");
  const completedBg = useColorModeValue("white", "gray.700");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask) return;
    setTasks([
      ...tasks,
      { id: tasks.length + 1, text: newTask, isCompleted: false },
    ]);
    setNewTask("");
  };

  const handleToggleCompleted = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <VStack
    mt={3}
      textAlign={"center"}
      justifyContent={"center"}
      h={"90h"}
      spacing={6}
      bg={useColorModeValue("gray.50", "gray.800")}
      px={4}
    >
      <Heading color={useColorModeValue("teal.500", "teal.300")}>Task Manager</Heading>
      <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.300")}>
        Add and manage your tasks efficiently
      </Text>

      <Box
        bg={formBackground}
        p={6}
        rounded="md"
        shadow="md"
        w={{ base: "full", sm: "md", lg: "lg" }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel textAlign="left" fontSize="lg" mb={2}>
              Add a new task
            </FormLabel>
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task"
              bg={inputBg}
              mb={4}
              _placeholder={{ color: useColorModeValue("gray.500", "gray.400") }}
            />
            <Button
              type="submit"
              colorScheme="teal"
              w="full"
              fontSize="lg"
              py={6}
            >
              Add Task
            </Button>
          </FormControl>
        </form>
      </Box>

      <VStack mt={4} w={{ base: "full", sm: "md", lg: "lg" }} spacing={4}>
        {tasks.length === 0 ? (
          <Text fontSize="lg" color="gray.500">
            No tasks added yet
          </Text>
        ) : (
          tasks.map((task) => (
            <Flex
              key={task.id}
              alignItems="center"
              justifyContent="space-between"
              bg={completedBg}
              w="full"
              p={4}
              rounded="md"
              shadow="sm"
              borderWidth="1px"
            >
              <Checkbox
                isChecked={task.isCompleted}
                onChange={() => handleToggleCompleted(task.id)}
                textDecoration={task.isCompleted ? "line-through" : "none"}
                colorScheme="teal"
              >
                {task.text}
              </Checkbox>
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete task"
                onClick={() => handleDeleteTask(task.id)}
                colorScheme="red"
                variant="outline"
                size="sm"
              />
            </Flex>
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default AddTask;