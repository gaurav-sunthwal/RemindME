"use client";

import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Navbar from "../Components/Navbar";
import AddTask from "../Components/AddTask";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    console.log("====================================");
    console.log(window.location.href.includes("/Home"));
    console.log("====================================");
    const email = localStorage.getItem("email"); // Get the email from localStorage
    if (!email) {
      if (window.location.href.includes("/Home") === true) {
        router.push("/home"); // Redirect to the login page if no email is found
      }
      router.push("/home"); // This line is likely unnecessary; keep only one redirect
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
