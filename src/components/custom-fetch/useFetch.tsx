import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const apiKey = "AIzaSyCLbu6V2H2PFoVnyWqLCekA60vC7oKhRzE";

const useFetch = function (url: string) {
  const key = `https://www.googleapis.com/books/v1/${url}&key=${apiKey}`;

  const { data, error, isLoading } = useSWR(key, fetcher);
  // console.log(data, "swr");

  return { data, error, isLoading };
};

export default useFetch;

// useEffect(() => {
//   const apiKey = "AIzaSyCLbu6V2H2PFoVnyWqLCekA60vC7oKhRzE";
//   const genre = "fiction";
//   const maxResults = 5;

//   const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=${maxResults}&key=${apiKey}`;

//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       // Update state with the fetched books
//       // setBooks(data.items);
//       console.log(data.items);
//     })
//     .catch((error) => console.error("Error:", error));
// }, []);
