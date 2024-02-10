// Biography

import GenreSection from "./GenreSection";
interface BookmarksProp {
  bookmarks: string[];
}

const BiographySection = function (props: BookmarksProp) {
  const genre = "biography";
  // const maxResults = 8;
  // const url = `volumes?q=subject:${genre}&maxResults=${maxResults}&`;

  return (
    <GenreSection
      title={genre}
      name="genre"
      bookmarks={props.bookmarks}
    ></GenreSection>
  );
};

export default BiographySection;
