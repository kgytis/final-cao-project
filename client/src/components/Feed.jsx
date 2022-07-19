// MUI imports
import { ButtonGroup, Typography, Button, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
// Component import
import QuestionCard from "./QuestionCard";
import FilteringMenu from "./FilteringMenu";
//React + Redux imports
import { useState, createContext } from "react";

export const QuestionContext = createContext();

const Feed = ({ data, newestSort, setNewestSort, setFilter, filter }) => {
  // Filtering div related states and it's handling (open / close)
  const [openFilter, setOpenFilter] = useState(false);
  const handleFilter = () => {
    openFilter === true ? setOpenFilter(false) : setOpenFilter(true);
  };

  const sortNewest = (e) => {
    newestSort === "newestDesc"
      ? setNewestSort("newestAsc")
      : setNewestSort("newestDesc");
  };

  const sortActive = (e) => {
    newestSort === "activeDesc"
      ? setNewestSort("activeAsc")
      : setNewestSort("activeDesc");
  };

  const sortAnswered = (e) => {
    newestSort === "answeredDesc"
      ? setNewestSort("answeredAsc")
      : setNewestSort("answeredDesc");
  };

  //-------------------------------------------------------
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      {data && (
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
                {data.length} questions
              </Typography>
              <ButtonGroup variant="outlined">
                <Button onClick={sortNewest} id="newestDesc">
                  Newest
                </Button>
                <Button id="activeSort" onClick={sortActive}>
                  Active
                </Button>
                <Button id="unansweredSort" onClick={sortAnswered}>
                  Unanswered
                </Button>
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
          <FilteringMenu
            display={openFilter}
            setFilter={setFilter}
            filter={filter}
          />
          {data.map((question, index) => {
            return (
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
            );
          })}
        </Box>
      )}
    </>
  );
};

export default Feed;
