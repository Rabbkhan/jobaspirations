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
import { ArrowLeft, PlusCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  COMPANY_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAllCompany, setLoading } from "@/features/companySlice";
import { toast } from "sonner";

const Jobcreate = () => {
  // const [companies, setCompanies] = useState([]);
  const { loading, allCompany } = useSelector((store) => store.company);
  const [filters, setFilters] = useState({
    industries: [],
    locations: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    industry: "",
    type: "",
    salaryMin: "",
    salaryMax: "",
    expMinMonths: "",
    expMaxMonths: "",
    description: "",
    skills: "",
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        dispatch(setLoading(true));

        const res = await axios.get(COMPANY_API_END_POINT, {
          withCredentials: true,
        });

        // console.log("Companies API:", res.data);

        // ✅ IMPORTANT: use correct response key
        dispatch(setAllCompany(res?.data?.companies || []));

        toast.success(res?.data?.message || "Companies loaded");
      } catch (error) {
        console.log("Fetch company error:", error);
        toast.error("Failed to load companies");
      } finally {
        dispatch(setLoading(false)); // ✅ NOW IT IS CORRECT
      }
    };

    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expMin = Number(formData.expMinMonths);
    const expMax = Number(formData.expMaxMonths);
    const salaryMin = Number(formData.salaryMin);
    const salaryMax = Number(formData.salaryMax);

    if (isNaN(expMin) || isNaN(expMax)) {
      return toast.error("Experience min and max are required");
    }

    if (isNaN(salaryMin) || isNaN(salaryMax)) {
      return toast.error("Salary min and max are required");
    }

    if (expMin < 0 || expMax < 0) {
      return toast.error("Experience cannot be negative");
    }

    if (salaryMin < 0 || salaryMax < 0) {
      return toast.error("Salary cannot be negative");
    }

    if (expMin > expMax) {
      return toast.error(
        "Minimum experience cannot be greater than maximum experience"
      );
    }

    if (salaryMin > salaryMax) {
      return toast.error(
        "Minimum salary cannot be greater than maximum salary"
      );
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        requirements: formData.skills.split(",").map((s) => s.trim()),

        salary: {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax),
        },

        experience: {
          min: Number(formData.expMinMonths),
          max: Number(formData.expMaxMonths),
        },

        location: formData.location,
        industry: formData.industry,
        jobType: formData.type,
        position: 1,
        company: formData.company,
      };

      const res = await axios.post(`${JOB_API_END_POINT}/create`, payload, {
        withCredentials: true,
      });

      toast.success(res?.data?.message);

      navigate("/recruiter/jobs");
    } catch (error) {
      console.log("Create job error:", error?.response?.data || error);
      toast.error(error?.response?.data?.message || "Failed to create job");
    }
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/filters`);
        setFilters(res.data.filters);
      } catch (err) {
        toast.error("Failed to load filters");
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Create Job
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Fill in the details below to publish a new job listing
            </p>
          </div>

          <Link to="/recruiter/jobs">
            <Button variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Back
            </Button>
          </Link>
        </div>

        {/* Card */}
        <Card className="border shadow-sm rounded-2xl">
          <form onSubmit={handleSubmit}>
            {/* SECTION: BASIC INFO */}
            <div className="p-6 border-b space-y-6">
              <h2 className="text-lg font-medium">Basic Information</h2>

              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  placeholder="Frontend Developer"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                {/* Company */}
                <div className="space-y-2 w-full">
                  <Label>Company</Label>

                  <Select
                    value={formData.company}
                    onValueChange={(value) => handleSelect("company", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select company" />
                    </SelectTrigger>

                    <SelectContent>
                      {loading ? (
                        <div className="p-3 text-sm text-muted-foreground text-center">
                          Loading companies...
                        </div>
                      ) : allCompany?.length === 0 ? (
                        <div className="p-3 text-sm text-muted-foreground text-center">
                          No companies found
                        </div>
                      ) : (
                        allCompany.map((company) => (
                          <SelectItem key={company._id} value={company._id}>
                            {company.companyname}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Type */}
                <div className="space-y-2 w-full">
                  <Label>Job Type</Label>

                  <Select
                    value={formData.type}
                    onValueChange={(v) => handleSelect("type", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Full-Time">Full-Time</SelectItem>
                      <SelectItem value="Part-Time">Part-Time</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* SECTION: DETAILS */}
            <div className="p-6 border-b space-y-6">
              <h2 className="text-lg font-medium">Job Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                <div className="w-full">
                  <Label>Location</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(v) => handleSelect("location", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>

                    <SelectContent>
                      {filters.locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry */}
                <div className="w-full">
                  <Label>Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(v) => handleSelect("industry", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>

                    <SelectContent>
                      {filters.industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Minimum Salary (₹)</Label>
                    <Input
                      placeholder="300000"
                      name="salaryMin"
                      value={formData.salaryMin}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum Salary (₹)</Label>
                    <Input
                      placeholder="800000"
                      name="salaryMax"
                      value={formData.salaryMax}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Min Experience (months)</Label>
                    <Input
                      placeholder="24"
                      name="expMinMonths"
                      value={formData.expMinMonths}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max Experience (months)</Label>
                    <Input
                      placeholder="0"
                      name="expMaxMonths"
                      value={formData.expMaxMonths}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION: DESCRIPTION */}
            <div className="p-6 space-y-6">
              <h2 className="text-lg font-medium">
                Description & Requirements
              </h2>

              <div className="space-y-2">
                <Label>Required Skills</Label>
                <Input
                  placeholder="React, Node.js, MongoDB"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Separate skills with commas
                </p>
              </div>

              <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea
                  rows={6}
                  placeholder="Describe responsibilities, expectations, and benefits..."
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t flex justify-end">
              <Button size="lg" className="gap-2">
                <PlusCircle size={18} />
                Create Job
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Jobcreate;
