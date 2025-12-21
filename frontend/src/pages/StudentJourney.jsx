import React from "react";
import { User, Search, FileText, CheckCircle, Rocket } from "lucide-react";

const steps = [
  {
    icon: <User className="w-8 h-8 text-primary" />,
    title: "Sign Up",
    desc: "Create your free account to start your job search journey.",
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Explore Jobs",
    desc: "Browse curated job listings tailored to your skills and interests.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Apply Easily",
    desc: "Submit applications seamlessly with your profile and resume.",
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Track Progress",
    desc: "Stay updated with application status and recruiter feedback.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    title: "Land Your Job",
    desc: "Get hired and kickstart your career with confidence.",
  },
];

const StudentJourney = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Your Journey to Success</h2>
        <p className="text-muted-foreground text-lg mb-16">
          Follow these simple steps to land your dream job with Job Aspirations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-background rounded-xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentJourney;
