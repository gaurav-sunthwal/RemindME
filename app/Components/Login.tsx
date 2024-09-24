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
} from "@chakra-ui/react";

interface CardProps {
  formBackground: string;
  toggleColorMode: () => void;
  isSignIn: boolean;
  onToggle: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Update to accept an event
}

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const [isSignIn, setIsSignIn] = useState(true); // New state for toggling between Sign In and Sign Up
  const [email, setEmail] = useState("gaurav@gmail.com"); // State for email input
  const [pasword, setPassword] = useState("gaurav"); // State for email input

  const handleToggle = () => {
    setIsSignIn(!isSignIn); // Toggle between Sign In and Sign Up
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from reloading the page
    // Save user details to local storage
    const userDetails = {
      email: email, // Use the actual email input value
      // Add other user details as needed
    };
    localStorage.setItem("user", JSON.stringify(userDetails));

    // Redirect to home page
    window.location.href = "/Home"; // Change to your actual home page route
  };

  return (
    <FormCard
      formBackground={formBackground}
      toggleColorMode={toggleColorMode}
      isSignIn={isSignIn}
      onToggle={handleToggle} // Pass the toggle function
      email={email} // Pass email state
      setEmail={setEmail} // Pass setEmail function
      password={pasword} // Pass email state
      setPassword={setPassword} // Pass setEmail function
      handleSubmit={handleSubmit} // Pass submit function
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
  return (
    <>
      <Flex h="100vh" w={"100%"} alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          bg={formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
          w={"50%"}
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
              value={email} // Bind the input value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              required
            />
            <Input
              placeholder="**********"
              type="password"
              variant="filled"
              mb={6}
              value={password} // Bind the input value to state
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button colorScheme="teal" mb={8} type="submit">
              {isSignIn ? "Log In" : "Sign Up"}{" "}
              {/* Change button text based on state */}
            </Button>
          </form>
          <HStack w={"100%"} justifyContent={"space-between"}>
            <Box>
              <Button variant="link" onClick={onToggle}>
                {isSignIn
                  ? "New user? Sign Up"
                  : "Already have an account? Sign In"}
              </Button>
            </Box>
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
