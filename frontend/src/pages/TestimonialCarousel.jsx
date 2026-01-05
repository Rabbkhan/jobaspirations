import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    feedback:
      "The team helped me understand what roles fit my skills and how to improve my resume. The guidance gave me a lot of clarity.",
    tag: "Final-year student",
  },
  {
    feedback:
      "I was confused about my career direction. After speaking with the Job Aspirations team, I had a clear plan and learning roadmap.",
    tag: "Fresher (Non-IT background)",
  },
  {
    feedback:
      "Their interview preparation tips and resume suggestions were practical and easy to apply.",
    tag: "Job seeker",
  },
  {
    feedback:
      "I appreciated the honest feedback on my skills and what I should focus on instead of false promises.",
    tag: "Career switcher",
  },
];


const TestimonialCarousel = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Student Feedback
        </h2>
        <p className="text-muted-foreground mb-10">
          Early feedback from students who interacted with our career guidance team.
        </p>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4500 })]}
        >
          <CarouselContent>
            {testimonials.map((t, idx) => (
              <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3 px-3">
                <Card className="p-6 h-full border rounded-xl shadow-sm bg-card text-left">
                  <CardContent className="text-sm text-muted-foreground">
                    “{t.feedback}”
                  </CardContent>

                  <div className="mt-4 text-xs text-muted-foreground font-medium">
                    — {t.tag}
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
