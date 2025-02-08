import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import { App } from "./App";

axios.defaults.baseURL = "http://localhost:5500/api";

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(`${queryKey[0]}`, { params: queryKey[1] });

  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      staleTime: 300000,
    },
  },
});

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
