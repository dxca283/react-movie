import { useState, useEffect } from "react";

const useFetchData = (path, queryParams, options) => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryString = new URLSearchParams(queryParams).toString(); 
      const endpoint = queryString ? `${path}?${queryString}` : path;
      console.log("Fetching from endpoint:", endpoint);
      try {
        const res = await fetch(endpoint, options);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setData(data || { results: [] });
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setData({ results: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, JSON.stringify(queryParams), JSON.stringify(options)]);

  return { data, loading, error, setError };
};

export default useFetchData;
