"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/register"); // Redirect to register page
  }, [router]);

  return null; // No UI rendered
}
