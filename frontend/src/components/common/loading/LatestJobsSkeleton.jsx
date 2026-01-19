import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LatestJobsSkeleton = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card
            key={idx}
            className="relative p-5 border shadow-sm rounded-2xl"
          >
            {/* Bookmark */}
            <Skeleton className="absolute right-4 top-4 h-6 w-6 rounded-full" />

            <CardHeader className="p-0 mb-3 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>

            <CardContent className="p-0 space-y-4">
              {/* Location */}
              <Skeleton className="h-4 w-2/3" />

              {/* Badges */}
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              <Skeleton className="h-px w-full" />

              {/* Footer */}
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LatestJobsSkeleton;
