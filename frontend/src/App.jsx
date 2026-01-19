
import { useDispatch, useSelector } from "react-redux";
import AppRoutes from "./routes";
import { loadSavedJobs } from "./thunk/SavedJobThunk";
import { useEffect } from "react";


function App() {
const { user } = useSelector((state) => state.auth);
const isAuthenticated = Boolean(user);

const dispatch = useDispatch()
useEffect(() => {
  if (isAuthenticated) {
    dispatch(loadSavedJobs());
  }
}, [isAuthenticated, dispatch]);

  return (
    <div className="bg-background min-h-screen">
      <AppRoutes/>
      
    </div>
  );
}

export default App;
