import GenreSection from "./GenreSection";

const FictionSection = function () {
  const genre = "fiction";
  // const maxResults = 8;
  // const url = `volumes?q=subject:${genre}&maxResults=${maxResults}&`;

  return <GenreSection title={genre} name="genre"></GenreSection>;
};

export default FictionSection;
