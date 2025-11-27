import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import { useLocation } from "react-router-dom";

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  // hide Navbar + Footer if route starts with "/admin"
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-background">
      
      {!isAdminRoute && <Navbar />}

      <div className="min-h-[80vh]">{children}</div>

      {!isAdminRoute && <Footer />}

    </div>
  );
};

export default MainLayout;
