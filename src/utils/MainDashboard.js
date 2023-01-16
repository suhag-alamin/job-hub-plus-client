import { useSelector } from "react-redux";
import AddJob from "../pages/Dashboard/AddJob";
import AppliedJobs from "../pages/Dashboard/AppliedJobs";

const MainDashboard = () => {
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  return <>{role === "employer" ? <AddJob /> : <AppliedJobs />}</>;
};

export default MainDashboard;
