import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default MainLayout;
