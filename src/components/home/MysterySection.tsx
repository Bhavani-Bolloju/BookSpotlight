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

const MysterySection = function (props: BookmarksProp) {
  const genre = "mystery";

  return (
    <GenreSection
      title={genre}
      name="genre"
      bookmarks={props.bookmarks}
      toggleBookmark={props.toggleBookmark}
    />
  );
};

export default MysterySection;
