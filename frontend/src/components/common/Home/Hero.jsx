import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-background border-b">
      <div className="max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

        {/* LEFT — MESSAGE */}
        <div className="space-y-10">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-1 rounded-full">
            Career Consulting & Hiring Platform
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            We don’t just find jobs. <br />
            <span className="text-primary">We build careers.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">
            From career guidance and resume reviews to direct hiring and
            recruiter access — we support you at every step of your journey.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button size="lg" onClick={() => navigate("/jobs")}>
              Explore Opportunities
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/consulting")}
            >
              Get Career Guidance
            </Button>
          </div>

          {/* Trust & Value */}
          <div className="grid sm:grid-cols-3 gap-6 pt-8 text-sm text-muted-foreground">
            {[
              "Personal career mentoring",
              "Verified recruiter network",
              "Skill-based job matching",
            ].map((item) => (
              <div key={item} className="flex gap-2 items-start">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — PROCESS VISUAL */}
        <div className="relative">
          <div className="absolute -inset-6 bg-primary/20 blur-3xl rounded-full" />

          <div className="relative bg-card border rounded-2xl shadow-xl p-8 space-y-8">
            <h3 className="text-lg font-semibold">
              How we help you succeed
            </h3>

            {[
              {
                step: "01",
                title: "Career Assessment",
                desc: "Understand your strengths and goals",
              },
              {
                step: "02",
                title: "Expert Guidance",
                desc: "Resume review, skill gap analysis",
              },
              {
                step: "03",
                title: "Direct Hiring",
                desc: "Connect with verified recruiters",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="text-primary font-semibold text-lg">
                  {item.step}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

            <Button
              variant="secondary"
              className="w-full"
              onClick={() => navigate("/hire")}
            >
              For Recruiters & Companies
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
