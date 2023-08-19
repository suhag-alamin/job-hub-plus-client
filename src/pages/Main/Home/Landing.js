import {
  Box,
  Button,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { gsap } from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import hero1 from "../../../assets/images/hero-01.jpg";
import hero2 from "../../../assets/images/hero-02.jpg";
import hero3 from "../../../assets/images/hero-03.jpg";
import hero4 from "../../../assets/images/hero-04.jpg";
import Badge from "../../../components/reuseable/Badge";
import { useSearchJobsMutation } from "../../../features/job/jobApi";
import homeStyles from "../../../styles/Home.module.scss";
import { useDispatch } from "react-redux";
import { setSearchJobs } from "../../../features/job/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Landing = () => {
  const keywords = [
    "Developer",
    "React",
    "Next.js",
    "Full Stack Developer",
    "Redux",
    "Node.js",
    "Express.js",
    "MongoDB",
  ];
  const el = useRef();
  const tl = useRef();
  const tl2 = useRef();

  useLayoutEffect(() => {
    let cards = gsap.utils.toArray(".statCard");

    let ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ repeat: -1 })
        .to("#hero1", { opacity: 1, duration: 2 })
        .to("#hero1", { opacity: 0, display: "none", duration: 2, delay: 1 })
        .to("#hero2", { opacity: 1, duration: 2 })
        .to("#hero2", { opacity: 0, display: "none", duration: 2, delay: 1 })
        .to("#hero3", { opacity: 1, duration: 2 })
        .to("#hero3", { opacity: 0, display: "none", duration: 2, delay: 1 })
        .to("#hero4", { opacity: 1, duration: 2 })
        .to("#hero4", { opacity: 0, display: "none", duration: 2, delay: 1 });

      tl2.current = gsap
        .timeline()
        .from("#hero-title", { delay: 0.2, y: 50, opacity: 0, duration: 0.3 })
        .from("#hero-subtitle", { y: 50, opacity: 0, duration: 0.3 })
        .from("#search-container", { y: 50, opacity: 0, duration: 0.3 })
        .from("#search-button", {
          x: -100,
          opacity: 0,
          duration: 0.5,
          ease: "power2",
        })
        .from(".badge-container", { opacity: 0 })
        .from(".badge", { opacity: 0, y: 50, stagger: 0.1 });
    }, el);

    const movement = (e) => {
      cards.forEach((card, index) => {
        const depth = 90;
        const moveX = (e.pageX - window.innerWidth / 2) / depth;
        const moveY = (e.pageY - window.innerHeight / 2) / depth;
        index++;
        gsap.to(card, {
          x: moveX * index,
          y: moveY * index,
        });
      });
    };

    document.addEventListener("mousemove", movement);

    return () => {
      ctx.revert();

      document.removeEventListener("mousemove", movement);
    };
  }, []);

  // * search jobs

  const [selectedKeyword, setSelectedKeyword] = useState("");
  const searchRef = useRef(null);

  console.log(selectedKeyword);

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
    searchRef.current.value = keyword;
  };

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
      <Box ref={el} sx={{ py: 14, px: { xs: 4, md: 8 } }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 4, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={6}>
            <Box sx={{ maxWidth: 500 }}>
              <Typography
                id="hero-title"
                sx={{ fontSize: { xs: 30, md: 48 }, fontWeight: 700, my: 2 }}
                variant="h1"
              >
                Find the perfect <br /> job for you
              </Typography>
              <Typography
                id="hero-subtitle"
                sx={{ fontSize: { xs: 16, md: 22 }, mb: 2 }}
                variant="body1"
              >
                Search your career opportunity <br /> through 12,800+ jobs
              </Typography>
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
              <Box>
                <Typography
                  sx={{ fontSize: 20, fontWeight: 700, my: 2 }}
                  variant="h2"
                  className="badge-container"
                >
                  Popular Search
                </Typography>
                <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {keywords.map((item) => (
                    <div
                      onClick={() => {
                        handleKeywordClick(item);
                      }}
                      key={item}
                    >
                      <Badge className="badge">{item}</Badge>
                    </div>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: { xs: 2, md: 7 },
              }}
            >
              <Box
                sx={{
                  borderRadius: 4,
                  boxShadow: 2,
                  py: 2,
                  px: 2,
                  bgcolor: "#fff",
                  position: { xs: "inherit", md: "relative" },
                  left: { xs: "inherit", md: "40%" },
                  width: { xs: 1, md: 280 },
                }}
                className="statCard"
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{ fontSize: 24, fontWeight: 700 }}
                    variant="subtitle1"
                    color="primary"
                  >
                    319+
                  </Typography>
                  <Typography variant="body1">Job offers</Typography>
                </Box>
                <Typography variant="body1">In Business Development</Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: 4,
                  boxShadow: 2,
                  py: 2,
                  px: 2,
                  bgcolor: "#fff",
                  position: { xs: "inherit", md: "relative" },
                  left: { xs: "inherit", md: "30%" },
                  width: { xs: 1, md: 280 },
                }}
                className="statCard"
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{ fontSize: 24, fontWeight: 700 }}
                    variant="subtitle1"
                    color="primary"
                  >
                    265+
                  </Typography>
                  <Typography variant="body1">Job offers</Typography>
                </Box>
                <Typography variant="body1">
                  In Marketing & Communication
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: 4,
                  boxShadow: 2,
                  py: 2,
                  px: 2,
                  bgcolor: "#fff",
                  position: { xs: "inherit", md: "relative" },
                  left: { xs: "inherit", md: "20%" },
                  width: { xs: 1, md: 280 },
                }}
                className="statCard"
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    sx={{ fontSize: 24, fontWeight: 700 }}
                    variant="subtitle1"
                    color="primary"
                  >
                    324+
                  </Typography>
                  <Typography variant="body1">Job offers</Typography>
                </Box>
                <Typography variant="body1">In Project Management</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            maxWidth: 672,
            height: "80vh",
            borderRadius: "0 0 9999px 9999px",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: -1,
            display: { xs: "none", md: "block" },
          }}
        >
          <img id="hero1" src={hero1} alt="" className={homeStyles.heroImage} />
          <img id="hero2" src={hero2} alt="" className={homeStyles.heroImage} />
          <img id="hero3" src={hero3} alt="" className={homeStyles.heroImage} />
          <img id="hero4" src={hero4} alt="" className={homeStyles.heroImage} />
        </Box>
      </Box>
    </div>
  );
};

export default Landing;
