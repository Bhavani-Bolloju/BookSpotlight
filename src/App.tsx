// import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import HeaderNavigation from "./components/nav-header/HeaderNavigation";
import HomePage from "./pages/Homepage";

function App() {
  const user = useContext(AuthContext);

  console.log(user);
  return (
    <div>
      <HeaderNavigation />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthenticationPage />}></Route>
      </Routes>
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

// const firebaseConfig = {
//   apiKey: "AIzaSyCzGmj9H2vsJjUQMpp06Pzl_3PakQSXn2g",
//   authDomain: "book-spotlight.firebaseapp.com",
//   projectId: "book-spotlight",
//   storageBucket: "book-spotlight.appspot.com",
//   messagingSenderId: "925241360946",
//   appId: "1:925241360946:web:d6d7125aad7128bb38722b"
// };
