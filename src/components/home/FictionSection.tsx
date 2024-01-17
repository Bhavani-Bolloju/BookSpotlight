import GenreSection from "./GenreSection";

const FictionSection = function () {
  const genre = "fiction";
  const maxResults = 8;
  const url = `volumes?q=subject:${genre}&maxResults=${maxResults}`;

  return <GenreSection url={url} genre={genre}></GenreSection>;
};

export default FictionSection;
