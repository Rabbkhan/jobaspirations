import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constants";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/features/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    profilePhotoFile: null,
  });

  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const changEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type))
      return toast.error("Only JPG, PNG, and WEBP images are allowed");

    if (file.size > MAX_SIZE)
      return toast.error("Image must be under 2MB");

    setInput((prev) => ({ ...prev, profilePhotoFile: file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    if (input.profilePhotoFile)
      formData.append("profilePhoto", input.profilePhotoFile);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Account created! Please verify your email");
        navigate("/verify-email", { state: { email: input.email } });
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="hidden md:flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-foreground leading-tight">
          Create your <span className="text-primary">JobAspirations</span> account
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Join thousands of job seekers and recruiters. Create an account & start your journey with a premium experience.
        </p>

        <img
          src="https://illustrations.popsy.co/amber/app-launch.svg"
          alt="Register Illustration"
          className="w-80 mt-6 opacity-90"
        />
      </div>

      <Card className="w-full max-w-lg shadow-xl border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-foreground">
            Create Your Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={submitHandler} className="space-y-5">

            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter your full name"
                name="fullname"
                value={input.fullname}
                onChange={changEventHandler}
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={input.email}
                onChange={changEventHandler}
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changEventHandler}
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                name="password"
                value={input.password}
                onChange={changEventHandler}
              />
            </div>

            <div className="space-y-2">
              <Label>Profile Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>

            {loading ? (
              <Button className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </Button>
            ) : (
              <Button className="w-full">Register</Button>
            )}

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
