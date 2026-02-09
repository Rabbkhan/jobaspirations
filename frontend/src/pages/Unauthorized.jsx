import React from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="bg-background border rounded-2xl shadow-lg p-10 max-w-md text-center space-y-6">
        <ShieldAlert className="w-16 h-16 text-destructive mx-auto" />

        <h1 className="text-3xl font-bold">Access Denied</h1>

        <p className="text-muted-foreground text-sm">
          You do not have permission to access this page.
        </p>

        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate(-1)}>Go Back</Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
