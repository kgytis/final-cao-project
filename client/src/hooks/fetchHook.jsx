// React module imports
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        return response.data;
      })
      .then((fetchData) => {
        setData(fetchData);
        setIsPending(false);
        setError(null);
        console.log(`Reducer value is-` + reducerValue);
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          err.toString();
        setError(message);
        toast.error(error);
      });
  }, [URL, reducerValue]);
  return {
    data,
    isPending,
    error,
    setData,
    setIsPending,
    setError,
    reducerValue,
    forceUpdate,
  };
};

export default useFetch;
