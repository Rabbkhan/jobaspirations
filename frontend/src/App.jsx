
import { useDispatch } from "react-redux";
import AppRoutes from "./routes";
import { loadSavedJobs } from "./thunk/SavedJobThunk";
import { useEffect } from "react";


function App() {
const dispatch = useDispatch()
useEffect(() => {
  dispatch(loadSavedJobs());
}, []);

  return (
    <div className="bg-background min-h-screen">
      <AppRoutes/>
      
    </div>
  );
}

export default App;
