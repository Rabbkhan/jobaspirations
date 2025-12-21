import { CheckCircle } from "lucide-react";

export default function RecruiterPending() {
  return (
    <main className="bg-background">
      <div className="max-w-xl mx-auto px-6 py-32 text-center space-y-6">
        <CheckCircle className="w-12 h-12 text-primary mx-auto" />
        <h1 className="text-3xl font-semibold">
          Application submitted
        </h1>
        <p className="text-muted-foreground">
          Our team is reviewing your request. You’ll receive an email once your
          recruiter access is approved.
        </p>
      </div>
    </main>
  );
}
