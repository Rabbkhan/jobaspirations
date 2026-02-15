import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes/AppRoutes.jsx";
import { loadSavedJobs } from "./thunk/SavedJobThunk";
import { useEffect, useState } from "react";
import ScrollToTop from "@/shared/components/ScrollToTop";
import LoaderScreen from "@/shared/components/LoaderScreen";

function App() {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true); // show loader initially
  const isAuthenticated = Boolean(user);

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (isAuthenticated) {
          await dispatch(loadSavedJobs()); // wait for thunk to complete
        }
      } catch (err) {
        console.error("Error loading saved jobs:", err);
      } finally {
        setLoading(false); // hide loader when initialization is done
      }
    };

    initializeApp();
  }, [isAuthenticated, dispatch]);

  // While loading, show LoaderScreen
  if (loading) return <LoaderScreen />;

  return (
    <div className="bg-background min-h-screen">
      <ScrollToTop />
      <AppRoutes />
    </div>
  );
}

export default App;