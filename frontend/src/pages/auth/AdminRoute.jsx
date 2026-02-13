import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import { setAdmin, clearAdmin } from "@/features/adminAuthSlice";

const AdminRoute = () => {
  const dispatch = useDispatch();
  const { admin, loading } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (admin !== null) return; // already verified

    const verify = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/admin/me`,
          { withCredentials: true }
        );
        console.log(res);
        
        dispatch(setAdmin(res.data.safeUser));
      } catch {
        dispatch(clearAdmin());
      }
    };

    verify();
  }, [admin, dispatch]);

  // ⏳ wait for verification
  if (admin === null && loading) return null;

  // ❌ NOT ADMIN
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ WRONG ROLE
  if (admin.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ ADMIN
  return <Outlet />;
};

export default AdminRoute;
