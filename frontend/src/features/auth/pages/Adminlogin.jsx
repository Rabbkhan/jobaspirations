import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setAdmin, setAdminLoading } from "@/features/admin/adminAuthSlice";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ LOCAL STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // ✅ REDUX STATE
  const { loading } = useSelector((state) => state.adminAuth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setAdminLoading(true));
    setError("");

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/admin/login`,
        formData,
        { withCredentials: true }
      );

      if (!res.data?.success) {
        throw new Error("Login failed");
      }

      const { safeUser } = res.data;

      // 🚫 ABSOLUTE BLOCK
      if (safeUser.role !== "admin") {
        throw new Error("Unauthorized access");
      }

      // ✅ ONLY NOW update Redux
      dispatch(setAdmin(safeUser));
      dispatch(setAdminLoading(false));

      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      dispatch(setAdminLoading(false));
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/20">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Input
          placeholder="Admin Email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          placeholder="Password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
