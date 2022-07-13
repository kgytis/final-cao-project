import { Stack } from "@mui/material";

import React from "react";
import Add from "../components/Add";
import Feed from "../components/Feed";
import RightBar from "../components/RightBar";
import Sidebar from "../components/Sidebar";
const FrontPage = ({ mode, setMode }) => {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode} />
        <Feed />
        <RightBar />
      </Stack>
      <Add />
    </>
  );
};

export default FrontPage;
