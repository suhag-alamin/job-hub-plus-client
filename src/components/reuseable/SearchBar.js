import { Button, LinearProgress, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSearchJobsMutation } from "../../features/job/jobApi";
import { setSearchJobs } from "../../features/job/jobSlice";
import homeStyles from "../../styles/Home.module.scss";

const SearchBar = () => {
  const searchRef = useRef(null);

  const [searchJobs, { data, isSuccess, isLoading }] = useSearchJobsMutation();

  const handleSearch = (e) => {
    const searchTerm = searchRef.current.value;
    e.preventDefault();
    if (searchTerm) {
      searchJobs(searchTerm);
    }
    console.log(searchRef.current.value);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data?.data?.length > 0) {
      dispatch(setSearchJobs(data?.data));
      navigate(`/jobs`);
    } else if (isSuccess && data?.data?.length === 0) {
      toast.error("No job found", {
        id: "search-error",
      });
    }
  }, [data, isSuccess, dispatch, navigate]);
  return (
    <div>
      {isLoading && <LinearProgress />}
      <form
        onSubmit={handleSearch}
        id="search-container"
        className={homeStyles.searchBox}
      >
        <TextField
          inputRef={searchRef}
          id="search"
          label="Job title or Keyword"
          variant="outlined"
          fullWidth
          type="search"
          sx={{ borderRadius: "100px" }}
        />
        <Button
          id="search-button"
          sx={{ borderRadius: 8 }}
          variant="contained"
          type="submit"
        >
          <BiSearchAlt />
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
