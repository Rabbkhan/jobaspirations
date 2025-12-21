import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const events = [
  {
    title: "Crack Frontend Interviews",
    date: "25 July 2025",
    mode: "Live Webinar",
  },
  {
    title: "Resume Review Workshop",
    date: "02 August 2025",
    mode: "Online Session",
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Events & Webinars</h2>
            <p className="text-muted-foreground mt-2">
              Learn directly from industry experts.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="border rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {event.date} • {event.mode}
                </p>
              </div>
              <Button variant="outline">
                <CalendarDays className="mr-2 h-4 w-4" />
                Register
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
