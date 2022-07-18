import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import QuestionEditDialog from "./QuestionEditDialog";
import { useState } from "react";
const QuestionEdit = ({ questionForceUpdate }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <QuestionEditDialog
        open={open}
        setOpen={setOpen}
        questionForceUpdate={questionForceUpdate}
      />
    </>
  );
};

export default QuestionEdit;
