// Biography

import GenreSection from "./GenreSection";
import { BookDetailsProp } from "../../firebase/services";
interface BookmarksProp {
  bookmarks: string[];
  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
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
      toggleBookmark={props.toggleBookmark}
    ></GenreSection>
  );
};

export default BiographySection;
