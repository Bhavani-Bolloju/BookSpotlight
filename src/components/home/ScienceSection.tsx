import GenreSection from "./GenreSection";

const ScienceSection = function () {
  const genre = "science";
  const maxResults = 8;
  const url = `volumes?q=subject:${genre}&maxResults=${maxResults}&`;

  return <GenreSection url={url} genre={genre}></GenreSection>;
};

export default ScienceSection;

// volumes ? q = subject : ${ genre }& maxResults=${     maxResults }
