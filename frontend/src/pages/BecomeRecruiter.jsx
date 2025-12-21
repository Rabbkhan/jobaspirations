import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BecomeRecruiter() {
  const navigate = useNavigate();

  return (
    <main className="bg-background">

      {/* HERO */}
      <section className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-24 text-center space-y-6">
          <h1 className="text-5xl font-semibold tracking-tight">
            Hire better with <span className="text-primary">expert support</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with companies to deliver quality candidates through
            curated listings and hands-on recruitment consulting.
          </p>

          <Button size="lg" onClick={() => navigate("/recruiter/apply")}>
            Request recruiter access
          </Button>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section>
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              This is for you if…
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              {[
                "You are hiring full-time or contract roles",
                "You want pre-screened, serious candidates",
                "You prefer quality over volume",
                "You value expert hiring advice",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle className="text-primary mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-6">
              This may not be for you if…
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              {[
                "You are only browsing candidates",
                "You are not actively hiring",
                "You expect instant mass resumes",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle className="text-muted-foreground mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-muted">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-12">
          {[
            {
              step: "01",
              title: "Apply for access",
              desc: "Share your hiring needs and company details.",
            },
            {
              step: "02",
              title: "Consultation",
              desc: "We align on role expectations and hiring strategy.",
            },
            {
              step: "03",
              title: "Hiring support",
              desc: "We source, screen, and assist until closure.",
            },
          ].map((item) => (
            <div key={item.step} className="space-y-3">
              <span className="text-sm text-primary font-semibold">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
          <h2 className="text-4xl font-semibold tracking-tight">
            Ready to start hiring the right way?
          </h2>
          <p className="text-muted-foreground text-lg">
            Request access and speak with a hiring consultant.
          </p>
          <Button size="lg" onClick={() => navigate("/recruiter/apply")}>
            Request recruiter access
          </Button>
        </div>
      </section>

    </main>
  );
}
