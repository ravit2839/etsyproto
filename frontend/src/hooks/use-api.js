import { useState } from "react";
import nprogress from "nprogress";

export default function useApi(
  apiFunc,
  { hasCatchError = false, keyExtractor = "" } = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function request(...params) {
    setIsLoading(true);
<<<<<<< HEAD
=======
    nprogress.start();
>>>>>>> origin/main
    console.log("params: ", ...params);

    try {
      const res = await apiFunc(...params);
      setIsLoading(false);

      if (keyExtractor === "") {
        setData(res.data);
      } else {
        setData(res.data[keyExtractor]);
      }

      setError({});
<<<<<<< HEAD
=======
      nprogress.done();
>>>>>>> origin/main
      console.log(res);
      return res;
    } catch (err) {
      console.log("error:", err);
      console.log("error from server: ", err.response);
      setIsLoading(false);

      if (err.response) {
        setError(err.response);
      } else {
        const errRes = {
          status: 503,
          data: {
            message: "Network Error. Please check your connection ..",
            errors: [],
          },
        };
        err.response = errRes;
        setError(err.response);
      }
<<<<<<< HEAD
=======

      nprogress.done();

>>>>>>> origin/main
      if (hasCatchError) {
        throw err;
      }
    }
  }

  return { isLoading, data, error, request };
}
