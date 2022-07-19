import {
  Checkbox,
  Box,
  FormLabel,
  FormControlLabel,
  FormGroup,
} from "@mui/material";

const FilteringMenu = ({ ...props }) => {
  const { display, setFilter } = props;
  const onChange = (e) => {
    setFilter(e.currentTarget.checked);
  };
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
                <FormControlLabel
                  control={<Checkbox onChange={onChange} />}
                  label="No answeres"
                />
              </FormGroup>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default FilteringMenu;
