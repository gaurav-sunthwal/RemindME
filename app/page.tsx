"use client";

import { useRouter } from "next/navigation"; // Updated import from next/router to next/navigation
import Login from "./Components/Login";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (name || email) {
      // If user details are found, set isAuthenticated to true
      setIsAuthenticated(true);
    }

    // Once the check is done, stop loading
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to home page if authenticated
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  // Show a loading state or spinner until the check is complete
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render Login component if user is not authenticated
  return !isAuthenticated ? <Login /> : null;
}