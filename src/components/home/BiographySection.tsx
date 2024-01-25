// Biography

import GenreSection from "./GenreSection";

const BiographySection = function () {
  const genre = "biography";
  const maxResults = 8;
  const url = `volumes?q=subject:${genre}&maxResults=${maxResults}&`;

  return <GenreSection url={url} title={genre} name="genre"></GenreSection>;
};

export default BiographySection;
