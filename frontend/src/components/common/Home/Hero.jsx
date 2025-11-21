import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full bg-background border-b">
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Find Your <span className="text-primary">Dream Job</span> Today
          </h1>

          <p className="mt-4 text-muted-foreground text-lg max-w-xl">
            Discover opportunities that align with your skills and passion.  
            Search from thousands of latest tech jobs.
          </p>

          {/* Search Bar */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search job titles or skills..."
                className="pl-10 py-6 text-base border-border bg-card"
              />
            </div>

            <Button className="px-8 py-6 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
              Search
            </Button>
          </div>
        </div>

        {/* RIGHT ILLUSTRATION */}
        <div className="hidden md:flex justify-center">
          <img
            src="https://illustrations.popsy.co/amber/remote-work.svg"
            alt="Job search illustration"
            className="w-[360px] opacity-95"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
