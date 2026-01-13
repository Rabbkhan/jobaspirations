import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../features/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const changEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        withCredentials: true,
      });

      if (res.data.success) {
        const role = res.data.safeUser.role;

        // 🚫 ABSOLUTE BLOCK: ADMINS DO NOT LOG IN HERE
        if (role === "admin") {
          toast.error("Admins are not allowed to log in from this portal");
          return;
        }

        // ✅ ALLOWED ROLES ONLY
        if (role === "student") {
          navigate("/profile");
        } else if (role === "recruiter") {
          navigate("/recruiter");
        } else {
          toast.error("Unauthorized role");
          return;
        }

        dispatch(setUser(res.data.safeUser));
        toast.success(res.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message;

      if (msg === "Please verify your email before logging in") {
        toast.info(msg);
        navigate(`/verify-email?email=${input.email}`);
        return;
      }

      toast.error(msg || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT SECTION */}
      <div className="hidden md:flex flex-col justify-center px-10">
        <h1 className="text-4xl font-bold leading-tight text-foreground">
          Welcome Back to
          <span className="text-primary"> JobAspirations</span>
        </h1>

        <p className="mt-4 text-muted-foreground">
          Login and continue your journey toward opportunities crafted for you.
        </p>

        <img
          src="https://illustrations.popsy.co/amber/idea-launch.svg"
          className="w-80 mt-6 opacity-90"
          alt=""
        />
      </div>

      {/* RIGHT SECTION */}
      <div className="flex justify-center items-center p-6">
        <Card className="w-full max-w-md p-2 shadow-xl border bg-card">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 mt-2">
            <form onSubmit={submitHandler}>
              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  placeholder="Enter your email"
                  className="bg-background"
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changEventHandler}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  className="bg-background"
                  value={input.password}
                  name="password"
                  onChange={changEventHandler}
                />
              </div>

              <p className="text-right text-sm">
                <Link
                  to="/forgot-password"
                  className="text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </p>

              {/* Button */}
              {loading ? (
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait....
                </Button>
              ) : (
                <Button className="w-full cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground">
                  Login
                </Button>
              )}

              <p className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Register
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
