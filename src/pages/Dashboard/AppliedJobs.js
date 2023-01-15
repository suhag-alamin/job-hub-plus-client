import { useSelector } from "react-redux";
import { useGetAppliedJobsByEmailQuery } from "../../features/job/jobApi";

const AppliedJobs = () => {
  const {
    user: { email },
  } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAppliedJobsByEmailQuery(email);

  return <div>Applied jobs {data?.data?.length}</div>;
};

export default AppliedJobs;
