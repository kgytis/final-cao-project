import { Stack } from "@mui/material";
import React from "react";
import Add from "../components/Add";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
// import RightBar from "../components/RightBar";
import Sidebar from "../components/Sidebar";
import useFetch from "../hooks/fetchHook";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useEffect } from "react";

const FrontPage = ({ mode, setMode }) => {
  const baseURL = "http://localhost:5000";
  const [newestSort, setNewestSort] = useState("newestDesc");
  const { data, isPending, forceUpdate } = useFetch(
    `${baseURL}/api/questions`,
    newestSort
  );
  const [filter, setFilter] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  useEffect(() => {
    if (filter) {
      setFilteredData(data.filter((data) => data.answerCount > 0));
    } else setFilteredData(data);
  }, [filter, data]);
  return (
    <>
      {isPending && <Spinner />}
      {filteredData && (
        <>
          <NavBar setMode={setMode} mode={mode} />
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar setMode={setMode} mode={mode} />
            <Feed
              data={filteredData}
              newestSort={newestSort}
              setNewestSort={setNewestSort}
              setFilter={setFilter}
              filter={filter}
            />
          </Stack>
          <Add forceUpdate={forceUpdate} />
        </>
      )}
    </>
  );
};

export default FrontPage;
