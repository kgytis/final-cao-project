import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import AnswerEditDialog from "./AnswerEditDialog";
import { useState } from "react";
const AnswerEdit = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <Edit />
      </IconButton>
      <AnswerEditDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default AnswerEdit;
