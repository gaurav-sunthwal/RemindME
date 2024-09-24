"use client";

import { Box } from "@chakra-ui/react";

import Navbar from "../Components/Navbar";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import AddTask from "../Components/AddTask";
const AddTask = dynamic(() => import("../Components/AddTask"), {
  ssr: false,
});

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
