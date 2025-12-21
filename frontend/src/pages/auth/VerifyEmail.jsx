import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { USER_API_END_POINT } from "../../utils/constants";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying"); // verifying | success | failed
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/verify-email?token=${token}`,
          { withCredentials: true }
        );

        if (res.data.success) {
          setStatus("success");
          toast.success("Email verified successfully");
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (err) {
        setStatus("failed");
      }
    };

    verify();
  }, [token, navigate]);

  const resendHandler = async () => {
    try {
      setLoading(true);

      const email = localStorage.getItem("pendingVerificationEmail");

      if (!email) {
        return toast.error("No email found for resending verification");
      }

      const res = await axios.post(
        `${USER_API_END_POINT}/resend-verification`,
        { email },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Verification email resent");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to resend verification"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {status === "verifying" && <p>Verifying your email...</p>}

      {status === "success" && (
        <p>Email verified successfully. Redirecting to login...</p>
      )}

      {status === "failed" && (
        <div className="flex flex-col gap-4 items-center">
          <p>Verification link is invalid or expired.</p>
          <Button disabled={loading} onClick={resendHandler}>
            Resend Verification Email
          </Button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
