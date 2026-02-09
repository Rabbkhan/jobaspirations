"use client";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function GuestHireCTA() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted px-6 text-center space-y-6">
      <h1 className="text-4xl font-bold">
        Want to request hiring support?
      </h1>
      <p className="text-lg text-muted-foreground max-w-md">
        To request curated talent, please log in or create an account. It only takes a few seconds!
      </p>

      <div className="flex gap-4">
        <Button size="lg" onClick={() => navigate("/login", { state: { redirectTo: "/hire" } })}>
          Login
        </Button>
        <Button size="lg" variant="outline" onClick={() => navigate("/register", { state: { redirectTo: "/hire" } })}>
          Register
        </Button>
      </div>
    </div>
  );
}
