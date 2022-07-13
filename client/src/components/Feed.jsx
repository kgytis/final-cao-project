import { ButtonGroup, Typography, Button, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import DropDownMenu from "./DropDownMenu";
import QuestionCard from "./QuestionCard";
import FilteringMenu from "./FilteringMenu";
import { useState } from "react";
const Feed = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleFilter = () => {
    openFilter === true ? setOpenFilter(false) : setOpenFilter(true);
  };
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
      <FilteringMenu display={openFilter} />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
    </Box>
  );
};

export default Feed;
