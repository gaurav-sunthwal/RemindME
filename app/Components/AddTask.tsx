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
  Spinner,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Auth/firebaseConfig";

interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
}

const AddTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const inputBg = useColorModeValue("white", "gray.600");
  const completedBg = useColorModeValue("white", "gray.700");

  const userEmail =
    JSON.parse(localStorage.getItem("user") || "{}").email || "";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "tasks"),
          where("email", "==", userEmail)
        );
        const querySnapshot = await getDocs(q);
        const fetchedTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          isCompleted: doc.data().isCompleted,
        }));
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchTasks();
    }
  }, [userEmail]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask || !userEmail) return;

    const tempTask = {
      id: `temp-${Date.now()}`,
      text: newTask,
      isCompleted: false,
    };

    setTasks((prevTasks) => [...prevTasks, tempTask]);
    setNewTask("");
    addTaskToFirebase(tempTask);
  };

  const addTaskToFirebase = async (tempTask: Task) => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        text: tempTask.text,
        isCompleted: tempTask.isCompleted,
        email: userEmail,
      });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === tempTask.id ? { ...task, id: docRef.id } : task
        )
      );
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleToggleCompleted = async (id: string, isCompleted: boolean) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, { isCompleted: !isCompleted });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, isCompleted: !isCompleted } : task
        )
      );
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleEditTask = async (id: string, newText: string) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, { text: newText });
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: newText } : task
        )
      );
      setIsEditing(null);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string
  ) => {
    if (e.key === "Enter" && isEditing) {
      handleEditTask(id, isEditing.text);
    }
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => Number(a.isCompleted) - Number(b.isCompleted)
  );

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
      <Heading color={useColorModeValue("teal.500", "teal.300")}>
        Task Manager
      </Heading>
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
              _placeholder={{
                color: useColorModeValue("gray.500", "gray.400"),
              }}
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

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <VStack mt={4} w={{ base: "full", sm: "md", lg: "lg" }} spacing={4}>
          {sortedTasks.length === 0 ? (
            <Text fontSize="lg" color="gray.500">
              No tasks added yet
            </Text>
          ) : (
            sortedTasks.map((task) => (
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
                  onChange={() =>
                    handleToggleCompleted(task.id, task.isCompleted)
                  }
                  textDecoration={task.isCompleted ? "line-through" : "none"}
                  colorScheme="teal"
                >
                  {isEditing?.id === task.id ? (
                    <Input
                      value={isEditing.text}
                      onChange={(e) =>
                        setIsEditing({ id: task.id, text: e.target.value })
                      }
                      onBlur={() => handleEditTask(task.id, isEditing.text)}
                      onKeyDown={(e) => handleKeyDown(e, task.id)}
                      autoFocus
                    />
                  ) : (
                    task.text
                  )}
                </Checkbox>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    icon={<CiMenuKebab />}
                    aria-label="Options"
                  />
                  <MenuList>
                    <MenuItem
                      onClick={() =>
                        setIsEditing({ id: task.id, text: task.text })
                      }
                    >
                      Edit
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDeleteTask(task.id)}
                      color="red.500"
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ))
          )}
        </VStack>
      )}
    </VStack>
  );
};

export default AddTask;
