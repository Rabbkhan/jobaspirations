import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const emailParam = params.get("email");
  const stateEmail = location.state?.email;
  const storedEmail = localStorage.getItem("pendingEmail");

  const email = emailParam || stateEmail || storedEmail || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (email) localStorage.setItem("pendingEmail", email);
    else console.warn("No email found for verification");
  }, [email]);

  if (!email) {
    return (
      <div className="text-center mt-10">
        <p>No email found. Please login or register again.</p>
      </div>
    );
  }

  // VERIFY EMAIL
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      toast.error("Enter a valid 6-digit code");
      return;
    }

    try {
      setLoading(true);

      console.log("Submitting verification:", { email, code });

      const res = await axios.post(
        `${USER_API_END_POINT}/verifyemail`,
        { email, code },
        { withCredentials: true } // include only if your backend uses cookies
      );

      console.log("Verification response:", res.data);

      if (res.data.success) {
        toast.success(res.data.message || "Email verified successfully");
        localStorage.removeItem("pendingEmail");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Verification failed");
      }
    } catch (err) {
      console.error("Verification error:", err);
      toast.error(err.response?.data?.message || "Verification failed or expired");
    } finally {
      setLoading(false);
    }
  };

  // RESEND CODE
  const resendHandler = async () => {
    if (!email) {
      toast.error("Email missing. Please login again");
      return;
    }

    try {
      setResending(true);

      console.log("Resending verification code for:", email);

      const res = await axios.post(
        `${USER_API_END_POINT}/verifyemail/request`,
        { email },
        { withCredentials: true } // include only if needed
      );

      console.log("Resend response:", res.data);

      if (res.data.success) {
        toast.success("Verification code sent again");
      } else {
        toast.error(res.data.message || "Failed to resend code");
      }
    } catch (err) {
      console.error("Resend code error:", err);
      toast.error(err.response?.data?.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px] shadow-md border">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm mb-3">
            Enter the 6-digit verification code sent to:
            <span className="font-semibold"> {email}</span>
          </p>

          <form onSubmit={submitHandler} className="space-y-4">
            <Input
              placeholder="Enter verification code"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              maxLength={6}
            />

            <Button disabled={loading} className="w-full">
              {loading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Didn’t receive the email?
              <Button
                variant="link"
                onClick={resendHandler}
                disabled={resending}
              >
                {resending ? "Sending..." : "Resend Code"}
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
