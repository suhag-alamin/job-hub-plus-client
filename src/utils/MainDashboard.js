import { useSelector } from "react-redux";
import AppliedJobs from "../pages/Dashboard/Candidate/AppliedJobs";
import AddJob from "../pages/Dashboard/Employer/AddJob";

const MainDashboard = () => {
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  return <>{role === "employer" ? <AddJob /> : <AppliedJobs />}</>;
};

export default MainDashboard;
