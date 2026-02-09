"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { RecruiterApply_API_END_POINT } from "@/utils/constants";

export default function HireApply() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    phoneNumber: "",
    companyname: "",
    companyEmail: "",
    companyWebsite: "",
    companyLinkedIn: "",
    companySize: "",
    companyLocation: "",
    companyDescription: "",
    recruiterLinkedIn: "",
    companyLogoFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const MAX_SIZE = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, and WEBP images are allowed");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Image must be under 2MB");
      return;
    }

    setForm({ ...form, companyLogoFile: file });
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const companySizeMapping = {
      "1-10": 10,
      "11-50": 50,
      "51-200": 200,
      "201-500": 500,
      "500+": 1000, // or any large number
    };

    try {
      const payload = new FormData();
      payload.append("userId", user?._id);
      payload.append("fullname", user?.fullname);
      payload.append("email", user?.email);
      payload.append("phoneNumber", form.phoneNumber);
      payload.append("companyname", form.companyname);
      payload.append("companyEmail", form.companyEmail);
      payload.append("website", form.companyWebsite);
      payload.append("companyLinkedin", form.companyLinkedIn);
      payload.append("employees", companySizeMapping[form.companySize] || 0);
      payload.append("location", form.companyLocation);
      payload.append("description", form.companyDescription);
      payload.append("linkedinProfile", form.recruiterLinkedIn);

      if (form.companyLogoFile) {
        payload.append("logo", form.companyLogoFile);
      }

      const { data } = await axios.post(
        `${RecruiterApply_API_END_POINT}/apply`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );

      if (data.success) {
        setSubmitted(true);
        if (data.success) {
          toast.success("Application submitted! Pending admin approval.");
          navigate("/pending-approval"); // or stay on same page
        }
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/40 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Apply as a Recruiter</CardTitle>
          <CardDescription>
            Submit your company details. Our team will review and approve your
            account before you can start hiring.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={submit} className="space-y-6">
            {submitted && (
              <Alert>
                <AlertDescription>
                  Your application has been submitted and is pending admin
                  approval.
                </AlertDescription>
              </Alert>
            )}

            {/* Split Form Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column: Recruiter Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Recruiter Information
                </h3>
                <div className="space-y-1">
                  <Label>Full Name</Label>
                  <Input value={user?.fullname || ""} disabled />
                </div>
                <div className="space-y-1">
                  <Label>Work Email</Label>
                  <Input value={user?.email || ""} disabled />
                </div>
                <div className="space-y-1">
                  <Label>Phone Number</Label>
                  <Input
                    placeholder="+91 98765 43210"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>LinkedIn Profile (optional)</Label>
                  <Input
                    placeholder="https://linkedin.com/in/yourprofile"
                    name="recruiterLinkedIn"
                    value={form.recruiterLinkedIn}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Right Column: Company Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  Company Information
                </h3>
                <div className="space-y-1">
                  <Label>Company Name</Label>
                  <Input
                    placeholder="Acme Technologies"
                    name="companyname"
                    value={form.companyname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Company Email</Label>
                  <Input
                    placeholder="contact@acme.com"
                    name="companyEmail"
                    value={form.companyEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>Company Description</Label>
                  <Input
                    placeholder="Short description about the company"
                    name="companyDescription"
                    value={form.companyDescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Company Website</Label>
                  <Input
                    placeholder="https://acme.com"
                    name="companyWebsite"
                    value={form.companyWebsite}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label>LinkedIn Page</Label>
                  <Input
                    placeholder="https://linkedin.com/company/acme"
                    name="companyLinkedIn"
                    value={form.companyLinkedIn}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label>Company Size</Label>
                    <Select
                      value={form.companySize}
                      onValueChange={(val) =>
                        setForm({ ...form, companySize: val })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1–10</SelectItem>
                        <SelectItem value="11-50">11–50</SelectItem>
                        <SelectItem value="51-200">51–200</SelectItem>
                        <SelectItem value="201-500">201–500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Location (optional)</Label>
                    <Input
                      placeholder="Bangalore, India"
                      name="companyLocation"
                      value={form.companyLocation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Company Logo (optional)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit for Approval"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
