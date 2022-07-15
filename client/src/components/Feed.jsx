// MUI imports
import { ButtonGroup, Typography, Button, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
// Component import
import DropDownMenu from "./DropDownMenu";
import QuestionCard from "./QuestionCard";
import FilteringMenu from "./FilteringMenu";
//React + Redux imports
import { useState, useEffect, createContext } from "react";
import { useNavigate, useLocation, browserHistory } from "react-router-dom";
import Spinner from "./Spinner";
import useFetch from "../hooks/fetchHook";

export const QuestionContext = createContext();

const Feed = () => {
  // Filtering div related states and it's handleing (open / close)
  const [openFilter, setOpenFilter] = useState(false);
  const handleFilter = () => {
    openFilter === true ? setOpenFilter(false) : setOpenFilter(true);
  };
  //-------------------------------------------------------
  const navigate = useNavigate();
  const baseURL = "http://localhost:5000";
  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isPending } = useFetch(`${baseURL}/api/questions`);

  useEffect(() => {}, [user]);
  if (isPending) {
    return <Spinner />;
  }

  return (
    <Box flex={4} padding={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ margin: 5 }}>
            70 questions
          </Typography>
          <ButtonGroup variant="outlined">
            <Button>Newest</Button>
            <Button>Active</Button>
            <Button sx={{ display: { xs: "none", xl: "block" } }}>
              Unanswered
            </Button>
            <Button sx={{ display: { xs: "none", xl: "block" } }}>Score</Button>
            <DropDownMenu />
          </ButtonGroup>
        </Box>
        <Button
          variant="outlined"
          endIcon={<FilterListIcon />}
          onClick={(e) => handleFilter()}
        >
          Filter
        </Button>
      </Box>
      <section>
        <h1>Welcome {user ? user.username : "Guest"}</h1>
      </section>
      <FilteringMenu display={openFilter} />
      {data.map((question, index) => {
        return (
          <>
            <QuestionContext.Provider
              value={question}
              key={`questionContext-${index}`}
            >
              <QuestionCard
                key={`question-${index}`}
                data={question}
                userData={user}
              />
            </QuestionContext.Provider>
          </>
        );
      })}
    </Box>
  );
};

export default Feed;
