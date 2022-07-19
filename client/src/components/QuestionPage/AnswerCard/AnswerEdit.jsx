import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import AnswerEditDialog from "./AnswerEditDialog";
import { useState } from "react";
const AnswerEdit = ({ answer }) => {
  const [open, setOpen] = useState(false);
  const [answerID, setAnswerID] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const handleClickOpen = (e) => {
    setOpen(true);
    setAnswerID(e.currentTarget.id);
  };

  return (
    <>
      {!user && (
        <IconButton
          disabled
          aria-label="edit"
          onClick={handleClickOpen}
          id={answer.id}
        >
          <Edit />
        </IconButton>
      )}
      {user && answer.user_id !== user._id && (
        <IconButton
          disabled
          aria-label="edit"
          onClick={handleClickOpen}
          id={answer.id}
        >
          <Edit />
        </IconButton>
      )}
      {user && answer.user_id === user._id && (
        <IconButton aria-label="edit" onClick={handleClickOpen} id={answer.id}>
          <Edit />
        </IconButton>
      )}
      {/* <IconButton aria-label="edit" onClick={handleClickOpen} id={answer.id}>
        <Edit />
      </IconButton> */}
      <AnswerEditDialog
        open={open}
        setOpen={setOpen}
        answerData={answer}
        modifyingAnswerID={answerID}
      />
    </>
  );
};

export default AnswerEdit;
