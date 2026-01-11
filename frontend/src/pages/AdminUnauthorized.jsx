import { Navigate } from "react-router-dom";

const AdminUnauthorized = () => {
  return <Navigate to="/admin/login" replace />;
};

export default AdminUnauthorized;
