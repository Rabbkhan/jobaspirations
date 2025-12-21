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
    name: "Priya Sharma",
    position: "Frontend Developer",
    company: "TechWave Solutions",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
    feedback:
      "Job Aspirations connected me with top companies quickly. The platform made the application process smooth, and I landed my first tech job within 3 weeks!",
  },
  {
    name: "Rahul Verma",
    position: "Data Analyst",
    company: "FinTech Innovations",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "I loved how easy it was to filter jobs based on my skills. The guidance and resources helped me prepare for interviews effectively.",
  },
  {
    name: "Ananya Kapoor",
    position: "UX Designer",
    company: "Creative Minds Studio",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "The consultancy aspect of the platform was invaluable. They suggested roles I wouldn’t have discovered on my own and provided feedback on my portfolio.",
  },
  {
    name: "Raj Kapoor",
    position: "Full Stack Developer",
    company: "Creative Minds Studio",
    photo: "https://randomuser.me/api/portraits/men/44.jpg",
    feedback:
      "The consultancy aspect of the platform was invaluable. They suggested roles I wouldn’t have discovered on my own and provided feedback on my portfolio.",
  },
];

const TestimonialCarousel = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Student Success Stories
        </h2>
        <p className="text-muted-foreground mb-10">
          Real students, real jobs, real growth.
        </p>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 4000 })]}
        >
          <CarouselContent className="ml-1">
            {testimonials.map((t, idx) => (
              <CarouselItem
                key={idx}
                className="px-3"
                style={{
                  flex: "0 0 100%", // default 1 per view
                }}
              >
                <div className="hidden lg:flex gap-6">
                  {/* For large screens, show multiple per slide */}
                  {testimonials.map((t2, idx2) => (
                    <Card
                      key={idx2}
                      className="p-6 border rounded-xl shadow-md bg-card text-left flex flex-col"
                    >
                      <CardHeader className="flex items-center gap-4">
                        <img
                          src={t2.photo}
                          alt={t2.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <CardTitle className="text-lg font-semibold">
                            {t2.name}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            {t2.position} @ {t2.company}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="mt-4 text-sm text-muted-foreground flex-grow">
                        "{t2.feedback}"
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Small screens: single testimonial */}
                <div className="lg:hidden">
                  <Card className="p-6 border rounded-xl shadow-md bg-card text-left flex flex-col">
                    <CardHeader className="flex items-center gap-4">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <CardTitle className="text-lg font-semibold">{t.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {t.position} @ {t.company}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-4 text-sm text-muted-foreground flex-grow">
                      "{t.feedback}"
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 text-primary" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 text-primary" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
