"use client"; 

import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'; // Import useEffect
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import Navbar from '../Components/Navbar';
import AddTask from '../Components/AddTask';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("email"); // Get the email from localStorage
    if (!email) {
      router.push("/Home"); // This line is likely unnecessary; keep only one redirect
      router.push("/home"); // Redirect to the login page if no email is found
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <Box>
        <AddTask />
      </Box>
    </div>
  );
}