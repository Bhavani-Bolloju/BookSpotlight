import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const useFetch = function (url: string) {
  const key = `https://www.googleapis.com/books/v1/${url}`;

  const { data, error, isLoading } = useSWR(key, fetcher);

  return { data, error, isLoading };
};
export default useFetch;
