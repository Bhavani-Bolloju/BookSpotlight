// import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthenticationPage from "./pages/AuthenticationPage";
import HeaderNavigation from "./components/nav-header/HeaderNavigation";
import HomePage from "./pages/Homepage";
import DetailBookPage from "./pages/DetailBookPage";
import GenreSearchResults from "./components/search-results/GenreSearchResults";
import AuthorSearchResults from "./components/search-results/AuthorSearchResults";
// import useUser from "./components/custom-hook/useUser";

function App() {
  const userAuth = useContext(AuthContext);

  return (
    <div>
      <HeaderNavigation />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path=":id" element={<DetailBookPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="auth"
            element={
              !userAuth ? <AuthenticationPage /> : <Navigate to="/" replace />
            }
          />
          <Route path="genre/:genreId" element={<GenreSearchResults />} />
          <Route path="author/:authorName" element={<AuthorSearchResults />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// const firebaseConfig = {
//   apiKey: "AIzaSyCzGmj9H2vsJjUQMpp06Pzl_3PakQSXn2g",
//   authDomain: "book-spotlight.firebaseapp.com",
//   projectId: "book-spotlight",
//   storageBucket: "book-spotlight.appspot.com",
//   messagingSenderId: "925241360946",
//   appId: "1:925241360946:web:d6d7125aad7128bb38722b"
// };
