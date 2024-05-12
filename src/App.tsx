import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";

import HeaderNavigation from "./components/nav-header/HeaderNavigation";
import { lazy, Suspense } from "react";
import Spinner from "react-bootstrap/Spinner";
// import HomePage from "./pages/Homepage";

const LazyDetailsBookPage = lazy(() => import("./pages/DetailBookPage"));
const LazyHomePage = lazy(() => import("./pages/Homepage"));
const LazyAuthenticationPage = lazy(() => import("./pages/AuthenticationPage"));
const LazyGenreSearchResults = lazy(
  () => import("./components/search-results/GenreSearchResults")
);
const LazyAuthorSearchResults = lazy(
  () => import("./components/search-results/AuthorSearchResults")
);
const LazyBookmarksPage = lazy(() => import("./pages/BookmarksPage"));

function App() {
  const userAuth = useContext(AuthContext);

  return (
    <div>
      <HeaderNavigation />
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Suspense
                fallback={
                  <div className="center">
                    <Spinner />
                  </div>
                }
              >
                <LazyHomePage />
              </Suspense>
            }
          />
          <Route
            path=":id"
            element={
              <Suspense
                fallback={
                  <div className="center">
                    <Spinner />
                  </div>
                }
              >
                <LazyDetailsBookPage />
              </Suspense>
            }
          />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route
            path="auth"
            element={
              !userAuth ? (
                <Suspense
                  fallback={
                    <div className="center">
                      <Spinner />
                    </div>
                  }
                >
                  <LazyAuthenticationPage />
                </Suspense>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="genre/:genreId"
            element={
              <Suspense
                fallback={
                  <div className="center">
                    <Spinner />
                  </div>
                }
              >
                <LazyGenreSearchResults />
              </Suspense>
            }
          />
          <Route
            path="author/:authorName"
            element={
              <Suspense
                fallback={
                  <div className="center">
                    <Spinner />
                  </div>
                }
              >
                <LazyAuthorSearchResults />
              </Suspense>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <Suspense
                fallback={
                  <div className="center">
                    <Spinner />
                  </div>
                }
              >
                <LazyBookmarksPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
