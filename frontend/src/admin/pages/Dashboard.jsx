import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent>
            <h4 className="font-semibold">Total Recruiters</h4>
            <p className="text-2xl mt-2">120</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h4 className="font-semibold">Pending Approvals</h4>
            <p className="text-2xl mt-2">12</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h4 className="font-semibold">Total Blogs</h4>
            <p className="text-2xl mt-2">35</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for charts or latest activity */}
      <Card>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
          Charts / Activity Feed Placeholder
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
