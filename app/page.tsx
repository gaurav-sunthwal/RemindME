"use client"

import { useRouter } from "next/navigation"; // Updated import from next/router to next/navigation
import Login from "./Components/Login";
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    console.log(name)

    if (name || email) {
      router.push("/home");
    }
  }, [router]);

  return (
    <>
      <Login />
    </>
  );
}
