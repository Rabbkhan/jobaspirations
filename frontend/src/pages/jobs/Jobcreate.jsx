import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Jobcreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Created:", formData);
    // API call here
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Job</h1>

        <Link to="/admin/jobs">
          <Button variant="outline" className="flex gap-2">
            <ArrowLeft size={18} />
            Back
          </Button>
        </Link>
      </div>

      {/* Form Card */}
      <Card className="p-6 space-y-6 shadow-sm border rounded-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Job Title */}
          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input
              placeholder="e.g. Frontend Developer"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                placeholder="TechHive Solutions"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Location */}
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                placeholder="Mumbai, India"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <Label>Salary</Label>
              <Input
                placeholder="₹ 8,00,000 / year"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select onValueChange={(v) => handleSelect("type", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience */}
            <div className="space-y-2 md:col-span-2">
              <Label>Experience Required</Label>
              <Input
                placeholder="e.g. 2+ years"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Required Skills</Label>
            <Input
              placeholder="React, Node.js, MongoDB"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
            <p className="text-sm text-muted-foreground">
              Separate multiple skills with commas.
            </p>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <Label>Job Description</Label>
            <Textarea
              placeholder="Describe the job role, responsibilities, and requirements..."
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full md:w-auto flex gap-2">
            <PlusCircle size={18} />
            Create Job
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Jobcreate;
