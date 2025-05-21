'use client'


import axiosInstance from "@/helpers/axiosInstance";
import { SWRConfig } from "swr";

function SwrProvider({ children }) {
  const fetcherFunction = async (url) => {
    try {
      const res = await axiosInstance.get(url);
      return res.data;
    } catch (error) {
      console.log("error fetching data from " + url, error);
      throw new Error("Something went wrong");
    }
  };

  return (
    <SWRConfig
      value={{
        fetcher: fetcherFunction,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SwrProvider;
