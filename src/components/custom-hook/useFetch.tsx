import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const useFetch = function (url: string) {
  const key = `https://www.googleapis.com/books/v1/${url}&key=AIzaSyCatJVQ3a_h17btJQp3-zDbg1ykzr6OZ1c`;

  const { data, error, isLoading } = useSWR(key, fetcher);

  console.log(data, "real data is being fetched");

  return { data, error, isLoading };
};
export default useFetch;
