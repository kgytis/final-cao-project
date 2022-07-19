// import { useState } from "react";

import {
  Checkbox,
  Button,
  Box,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  FormGroup,
} from "@mui/material";
// import FilterListIcon from "@mui/icons-material/FilterList";

const FilteringMenu = ({ ...props }) => {
  const { display } = props;
  return (
    <>
      {display && (
        <Box sx={{ display: "block" }} padding={2} flex={4}>
          <Box display="flex" gap={30}>
            <Box>
              <FormLabel id="demo-radio-buttons-group-label">
                Filtered By
              </FormLabel>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="No answeres" />
              </FormGroup>
            </Box>
            <Box>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Sorted By
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  //   defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="newest"
                    control={<Radio />}
                    label="Newest"
                  />
                  <FormControlLabel
                    value="active"
                    control={<Radio />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="unanswered"
                    control={<Radio />}
                    label="Unanswered"
                  />
                  <FormControlLabel
                    value="score"
                    control={<Radio />}
                    label="Score"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Button variant="contained">Apply Filter</Button>
            <Button variant="outlined">Cancel</Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FilteringMenu;
