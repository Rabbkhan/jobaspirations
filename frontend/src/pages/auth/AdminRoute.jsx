import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
const AdminRoute = () => {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    axios
      .get(`${USER_API_END_POINT}/admin/me`, { withCredentials: true })
      .then(() => setAllowed(true))
      .catch(() => setAllowed(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  return allowed ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
