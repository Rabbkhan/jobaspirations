import { Skeleton } from "@/components/ui/skeleton";

const DashboardLoading = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <Skeleton className="h-8 w-40" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 border rounded-xl bg-card flex flex-col space-y-2"
          >
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border rounded-xl p-4">
        <Skeleton className="h-6 w-32 mb-4" />

        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-full mb-2" />
        ))}
      </div>
    </div>
  );
};

export default DashboardLoading;
