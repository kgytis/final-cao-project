// React module imports
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useFetch = (URL) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

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
  }, [URL]);
  return { data, isPending, error, setData, setIsPending, setError };
};

export default useFetch;
