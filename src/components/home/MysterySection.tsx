// Biography

import GenreSection from "./GenreSection";

const MysterySection = function () {
  const genre = "mystery";
  const maxResults = 8;
  const url = `volumes?q=subject:${genre}&maxResults=${maxResults}`;

  return <GenreSection url={url} genre={genre}></GenreSection>;
};

export default MysterySection;
