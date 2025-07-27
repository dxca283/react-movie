import { useState } from "react";

const useQuery = (initialValue) => {
  const [query, setQuery] = useState(initialValue);
  const updateQuery = (newQuery) => {
    setQuery((prev) => ({
      ...prev,
      ...newQuery,
    }));
  };

  const resetQuery = () => {
    setQuery(initialValue);
  };

  return [query, updateQuery, resetQuery];
};

export default useQuery;
