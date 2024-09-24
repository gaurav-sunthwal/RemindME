"use client";

import React, { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  HStack,
  Box,
  useMediaQuery,
  Divider,
} from "@chakra-ui/react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // Import Firebase functions
import { useToast } from "@chakra-ui/react";
import { auth } from "../Auth/firebaseConfig";
import { useRouter } from "next/navigation";

interface CardProps {
  formBackground: string;
  toggleColorMode: () => void;
  isSignIn: boolean;
  onToggle: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Update this line to include the event argument
}

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [isSignIn, setIsSignIn] = useState(true); // State for toggling between Sign In and Sign Up
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input

  const toast = useToast(); // Chakra UI toast for notifications
  const router = useRouter();
  const handleToggle = () => {
    setIsSignIn(!isSignIn); // Toggle between Sign In and Sign Up
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (isSignIn) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify({ email: user.email }));
        router.push("/home"); // Using router instead of window.location
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.email}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error Logging In",
          description: error instanceof Error ? error.message : "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify({ email: user.email }));
        router.push("/Home"); // Using router instead of window.location
        toast({
          title: "Account Created",
          description: `Account created for ${user.email}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Error Signing Up",
          description: error instanceof Error ? error.message : "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <FormCard
      formBackground={formBackground}
      toggleColorMode={toggleColorMode}
      isSignIn={isSignIn}
      onToggle={handleToggle}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

function FormCard({
  formBackground,
  toggleColorMode,
  isSignIn,
  onToggle,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
}: CardProps) {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
  return (
    <>
      <Flex h="100vh" w={"100%"} alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
          w={"80%"}
        >
          <Heading mb={6}>{isSignIn ? "Log In" : "Sign Up"}</Heading>
          <form onSubmit={handleSubmit}>
            {!isSignIn && ( // Show name input only for Sign Up
              <Input
                placeholder="John Doe"
                type="text"
                variant="filled"
                mb={3}
                required
              />
            )}
            <Input
              placeholder="johndoe@gmail.com"
              type="email"
              variant="filled"
              mb={3}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="**********"
              type="password"
              variant="filled"
              mb={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button colorScheme="teal" mb={8} type="submit">
              {isSignIn ? "Log In" : "Sign Up"}
            </Button>
          </form>
          <HStack w={"100%"} justifyContent={"space-between"} wrap={"wrap"}>
            <Box>
              <Button variant="link" onClick={onToggle}>
                {isSignIn
                  ? "New user? Sign Up"
                  : "Already have an account? Sign In"}
              </Button>
            </Box>
            {isLargerThan800 ? "": <Divider />  }
            <Box>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="dark_mode" mb="0">
                  Enable Dark Mode?
                </FormLabel>
                <Switch
                  id="dark_mode"
                  colorScheme="teal"
                  size="lg"
                  onChange={toggleColorMode}
                />
              </FormControl>
            </Box>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
}

export default Login;
