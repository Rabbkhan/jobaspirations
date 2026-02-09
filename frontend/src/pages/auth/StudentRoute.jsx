import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const StudentRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "student") {
    return (
      <Navigate
        to="/unauthorized"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
};

export default StudentRoute;
