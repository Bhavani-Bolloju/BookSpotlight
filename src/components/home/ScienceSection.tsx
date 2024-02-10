import GenreSection from "./GenreSection";

interface BookmarksProp {
  bookmarks: string[];
}

const ScienceSection = function (props: BookmarksProp) {
  const genre = "science";
  // const maxResults = 8;
  // const url = `volumes?q=subject:${genre}&maxResults=${maxResults}&`;

  return (
    <GenreSection
      name="genre"
      title={genre}
      bookmarks={props.bookmarks}
    ></GenreSection>
  );
};

export default ScienceSection;

// volumes ? q = subject : ${ genre }& maxResults=${     maxResults }
