import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { BookOpen, FileText, TrendingUp } from "lucide-react";

const resources = [
  {
    title: "Top 10 Interview Questions",
    description: "Most asked questions by recruiters with sample answers.",
    icon: BookOpen,
  },
  {
    title: "Resume Building Guide",
    description: "Step-by-step resume tips approved by hiring managers.",
    icon: FileText,
  },
  {
    title: "Upskilling Roadmaps",
    description: "Frontend, Backend, Data & Product career paths.",
    icon: TrendingUp,
  },
];

const SkillResources = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          Skill & Career Resources
        </h2>
        <p className="text-muted-foreground text-center mt-3 mb-12">
          Learn, prepare, and grow with expert-curated resources.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res, idx) => {
            const Icon = res.icon;
            return (
              <Card key={idx} className="hover:shadow-md transition">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="text-primary" />
                  </div>
                  <CardTitle>{res.title}</CardTitle>
                  <CardDescription>{res.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillResources;
