// import { useEffect } from "react";

function App() {
  return (
    <div>
      <h1>bookSpotLight</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
        exercitationem mollitia iusto, dolorem, ut recusandae saepe incidunt
        ducimus quam vero, repellat neque error numquam beatae? Unde quaerat
        quod omnis voluptatibus?
      </p>
    </div>
  );
}

export default App;

// useEffect(() => {
//   const apiKey = "AIzaSyCLbu6V2H2PFoVnyWqLCekA60vC7oKhRzE";
//   const genre = "fantasy";
//   const maxResults = 10;

//   const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=${maxResults}&key=${apiKey}`;

//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       // Update state with the fetched books
//       setBooks(data.items);
//     })
//     .catch((error) => console.error("Error:", error));
// }, []);
