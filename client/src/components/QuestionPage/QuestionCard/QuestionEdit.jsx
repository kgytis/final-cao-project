import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import QuestionEditDialog from "./QuestionEditDialog";
import { useState, useContext } from "react";
import { QuestionContext } from "../../../pages/Question";
const QuestionEdit = ({ questionForceUpdate }) => {
  const { question } = useContext(QuestionContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {!user && (
        <IconButton disabled aria-label="edit" onClick={handleClickOpen}>
          <Edit />
        </IconButton>
      )}
      {user && question[0].user_id !== user._id && (
        <IconButton disabled aria-label="edit" onClick={handleClickOpen}>
          <Edit />
        </IconButton>
      )}
      {user && question[0].user_id === user._id && (
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <Edit />
        </IconButton>
      )}
      <QuestionEditDialog
        open={open}
        setOpen={setOpen}
        questionForceUpdate={questionForceUpdate}
      />
    </>
  );
};

export default QuestionEdit;
