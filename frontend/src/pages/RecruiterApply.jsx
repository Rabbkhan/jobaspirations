import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecruiterApply() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyName: "",
    website: "",
    hiringType: "",
    monthlyHires: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // later → POST to backend
    navigate("/recruiter/pending");
  };

  return (
    <main className="bg-background">
      <div className="max-w-3xl mx-auto px-6 py-24">

        <Card className="p-8 space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">
              Recruiter access request
            </h1>
            <p className="text-muted-foreground">
              Tell us about your company and hiring needs. Our team will review
              your request within 24–48 hours.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="space-y-2">
              <Label>Company name</Label>
              <Input
                name="companyName"
                required
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Company website (optional)</Label>
              <Input
                name="website"
                onChange={handleChange}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Hiring type</Label>
                <Input
                  name="hiringType"
                  placeholder="Tech / Non-tech / Both"
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label>Expected hires per month</Label>
                <Input
                  name="monthlyHires"
                  type="number"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>What are you hiring for?</Label>
              <Textarea
                name="message"
                rows={4}
                required
                onChange={handleChange}
              />
            </div>

            <Button size="lg" className="w-full">
              Submit request
            </Button>

          </form>
        </Card>

      </div>
    </main>
  );
}
