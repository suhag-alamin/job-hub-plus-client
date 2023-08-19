import { useSelector } from "react-redux";
import AppliedJobs from "../pages/Dashboard/Candidate/AppliedJobs";
import ManageJobs from "../pages/Dashboard/Employer/ManageJobs";

const MainDashboard = () => {
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  return <>{role === "employer" ? <ManageJobs /> : <AppliedJobs />}</>;
};

export default MainDashboard;
