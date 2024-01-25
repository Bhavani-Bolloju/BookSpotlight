// import React from 'react'
import { useParams } from "react-router-dom";
import SearchResults from "./SearchResults";

function AuthorSearchResults() {
  const params = useParams();

  const genre = params?.authorName;

  console.log(genre);

  return (
    <div>
      {genre && <SearchResults genre={genre} title="author"></SearchResults>}
    </div>
  );
}

export default AuthorSearchResults;
