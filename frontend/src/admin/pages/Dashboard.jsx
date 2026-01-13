import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { clearAdmin } from "@/features/adminAuthSlice";

const Dashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${USER_API_END_POINT}/admin/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Admin logout failed:", error);
    } finally {
      // 🔥 CRITICAL
      dispatch(clearAdmin());

      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Logout */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

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

      {/* Placeholder */}
      <Card>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
          Charts / Activity Feed Placeholder
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
