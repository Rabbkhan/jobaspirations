import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constants";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../features/authSlice";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
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

const changeFileHandler = (e) => {

  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

if (!allowedTypes.includes(file.type)) {
  return toast.error("Only JPG, PNG, and WEBP images are allowed");
}

if (file.size > MAX_SIZE) {
  return toast.error("Image must be under 2MB");
}

  const file = e.target.files?.[0];
  if (!file) return;
  setInput((prev) => ({ ...prev, profilePhotoFile: file }));
};


const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullname", input.fullname);
  formData.append("email", input.email);
  formData.append("phoneNumber", input.phoneNumber);
  formData.append("password", input.password);
  formData.append("role", input.role);

  if (input.profilePhotoFile) {
    formData.append("profilePhoto", input.profilePhotoFile); // FIXED
  }

  try {
    dispatch(setLoading(true));

    const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });

    if (res.data.success) {
      toast.success(res.data.message);
      navigate("/login");
    }
  } catch (err) {
    toast.error(err.response.data.message);
  } finally {
    dispatch(setLoading(false));
  }
};

  return (
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT SECTION */}
      <div className="hidden md:flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-foreground leading-tight">
          Create your
          <span className="text-primary"> JobAspirations</span>
          account
        </h1>

        <p className="mt-4 text-muted-foreground leading-relaxed">
          Join thousands of job seekers and recruiters. Create an account &
          start your journey with a premium experience.
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
            {/* FULL NAME */}
            <div className="space-y-2">
              <Label className="text-foreground">Full Name</Label>
              <Input
                placeholder="Enter your full name"
                className="bg-background"
                value={input.fullname}
                name="fullname"
                onChange={changEventHandler}
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <Label className="text-foreground">Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
                value={input.email}
                name="email"
                onChange={changEventHandler}
              />
            </div>

            {/* PHONE NUMBER */}
            <div className="space-y-2">
              <Label className="text-foreground">Phone Number</Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                className="bg-background"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changEventHandler}
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label className="text-foreground">Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                className="bg-background"
                value={input.password}
                name="password"
                onChange={changEventHandler}
              />
            </div>

            {/* ROLE SELECTOR (RADIO) */}
            <div className="space-y-2">
              <Label className="text-foreground">Register as</Label>

              <RadioGroup
                value={input.role}
                onValueChange={(value) => setInput({ ...input, role: value })}
                className="space-y-2"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student (Job Seeker)</Label>
                </div>

                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="recruiter" id="recruiter" />
                  <Label htmlFor="recruiter">Recruiter (Hiring)</Label>
                </div>
              </RadioGroup>
            </div>

            {/* PROFILE IMAGE UPLOAD */}
            <div className="space-y-2">
              <Label className="text-foreground">Profile Image</Label>

              <div className="flex items-center gap-4">
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className="cursor-pointer bg-background"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
          {loading ? (
                <Button className="w-full bg-primary  hover:bg-primary/90 text-primary-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait....
                </Button>
              ) : (
                <Button className="w-full bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground">
                  Register
                </Button>
              )}

            {/* LOGIN REDIRECT */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                <Link to="/login"> Login</Link>
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
