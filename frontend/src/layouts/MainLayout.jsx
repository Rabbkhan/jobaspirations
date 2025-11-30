import { Outlet } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="min-h-[80vh]">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
   