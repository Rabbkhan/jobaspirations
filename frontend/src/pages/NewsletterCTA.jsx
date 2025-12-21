import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const NewsletterCTA = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold">
          Stay Updated With Latest Jobs
        </h2>
        <p className="opacity-90 mt-3 mb-8">
          Get weekly job alerts, career tips & exclusive opportunities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Enter your email"
            className="bg-background text-foreground"
          />
          <Button variant="secondary">Subscribe</Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;
