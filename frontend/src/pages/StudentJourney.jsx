import React from "react";
import {
  User,
  FileText,
  Search,
  Briefcase,
  IndianRupee,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: User,
    title: "Create an Account",
    desc: "Sign up for free and get access to job opportunities.",
  },
  {
    icon: FileText,
    title: "Complete Your Profile",
    desc: "Add your education, skills, and resume to apply for roles.",
  },
  {
    icon: Search,
    title: "Apply to Jobs",
    desc: "Browse and apply to relevant openings on the platform.",
  },
  {
    icon: Briefcase,
    title: "Get Hired",
    desc: "If selected, recruiters will contact you directly.",
  },
  {
    icon: IndianRupee,
    title: "Pay After Joining",
    desc: "A success fee is charged only after you secure a job through Job Aspirations.",
  },
];

const StudentJourney = () => {
  const navigate = useNavigate()
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl font-semibold">
            How Job Aspirations Works for Students
          </h2>
          <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
            Use the platform for free. Pay only when you get hired.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-background border rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <h3 className="text-base font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Legal clarity */}
        <p className="mt-14 text-xs text-muted-foreground max-w-3xl mx-auto">
          Job Aspirations does not guarantee placement. Success fee applies only
          if the candidate is hired through the platform and joins the company.
          Terms and conditions apply.
        </p>

        <div className="mt-8">
          <Button size="lg" className="cursor-pointer" onClick={() => navigate("/jobs")}>Browse Jobs</Button>
        </div>
      </div>
    </section>
  );
};

export default StudentJourney;
