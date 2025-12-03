import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  COMPANY_API_END_POINT,
  JOB_API_END_POINT,
} from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompany, setLoading } from "../../features/companySlice";
import { toast } from "sonner";

const AdminJobEdit = () => {
  const { id } = useParams(); // ✅ Job ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, allCompany } = useSelector((store) => store.company);

  const [formData, setFormData] = useState({
    title: "",
    company: "", // hidden value for backend
    companyName: "", // visible text
    location: "",
    salary: "",
    type: "",
    experience: "",
    description: "",
    skills: "",
  });

  // ✅ FETCH COMPANIES
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        dispatch(setLoading(true));

        const res = await axios.get(COMPANY_API_END_POINT, {
          withCredentials: true,
        });

        dispatch(setAllCompany(res?.data?.companies || []));
      } catch (error) {
        toast.error("Failed to load companies");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCompanies();
  }, []);

  // ✅ FETCH JOB DETAILS
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/${id}`, {
          withCredentials: true,
        });

        console.log(res);

        const job = res.data.job;

        setFormData({
            title:job.title,
          company: job.company?._id, // keep for backend update
          companyName: job.company?.companyname, // for display only

          location: job.location,
          salary: job.salary,
          type: job.jobType,
          experience: job.experienceLevel,
          description: job.description,
          skills: job.requirements.join(", "),
        });
      } catch (error) {
        toast.error("Failed to load job data");
      }
    };

    if (id) fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // ✅ UPDATE JOB
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        requirements: formData.skills.split(",").map((s) => s.trim()),
        salary: Number(formData.salary),
        experienceLevel: Number(formData.experience),
        location: formData.location,
        jobType: formData.type,
        company: formData.company,
      };

      const res = await axios.put(`${JOB_API_END_POINT}/${id}`, payload, {
        withCredentials: true,
      });

      toast.success(res?.data?.message || "Job updated successfully");

      navigate("/admin/jobs");
    } catch (error) {
      console.log("Update job error:", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Failed to update job");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Job</h1>

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
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div className="space-y-2">
              <Label>Company</Label>
              <Input
                value={formData.companyName}
                disabled
                className="bg-muted cursor-not-allowed"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
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
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select
                value={formData.type}
                onValueChange={(v) => handleSelect("type", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Full-Time">Full-Time</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Experience */}
            <div className="space-y-2 md:col-span-2">
              <Label>Experience Required</Label>
              <Input
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
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Job Description</Label>
            <Textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full md:w-auto flex gap-2">
            <Save size={18} />
            Update Job
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminJobEdit;
