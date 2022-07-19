// MUI imports
import { ButtonGroup, Typography, Button, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
// Component import
import DropDownMenu from "./DropDownMenu";
import QuestionCard from "./QuestionCard";
import FilteringMenu from "./FilteringMenu";
//React + Redux imports
import { useState, createContext } from "react";

export const QuestionContext = createContext();

const Feed = ({ data, newestSort, setNewestSort }) => {
  // Filtering div related states and it's handleing (open / close)
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

  //-------------------------------------------------------
  const user = JSON.parse(localStorage.getItem("user"));
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
            {data.length} questions
          </Typography>
          <ButtonGroup variant="outlined">
            <Button onClick={sortNewest} id="newestDesc">
              Newest
            </Button>
            <Button id="activeSort" onClick={sortActive}>
              Active
            </Button>
            <Button
              sx={{ display: { xs: "none", xl: "block" } }}
              id="unansweredSort"
            >
              Unanswered
            </Button>
            <Button
              sx={{ display: { xs: "none", xl: "block" } }}
              id="scoreSort"
            >
              Score
            </Button>
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
