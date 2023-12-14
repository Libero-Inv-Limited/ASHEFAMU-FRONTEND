import React from "react";
import { executeGetAllGISFacilities } from "./../../../apis/facility";

const useFetchHook = (arg: GISPayload) => {
  const [state, setState] = React.useState(null);

  const fetchData = async () => {
    try {
      const response = await executeGetAllGISFacilities(arg);
      const { data } = response;
      setState(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [arg]);

  return {
    data: state,
  };
};

export default useFetchHook;
