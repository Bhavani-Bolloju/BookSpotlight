// import React from "react";
import { useParams } from "react-router-dom";
import SearchResults from "./SearchResults";

function GenreSearchResults() {
  const params = useParams();

  const genre = params?.genreId;

  return (
    <div>
      {genre && <SearchResults genre={genre} title="genre"></SearchResults>}
    </div>
  );
}

export default GenreSearchResults;
