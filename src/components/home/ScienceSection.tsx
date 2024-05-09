import GenreSection from "./GenreSection";
import { BookDetailsProp } from "../../firebase/services";

interface ScienceSectionProp {
  bookmarks: string[];
  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
}

const ScienceSection = function (props: ScienceSectionProp) {
  const genre = "science";

  return (
    <GenreSection
      name="genre"
      title={genre}
      bookmarks={props.bookmarks}
      toggleBookmark={props.toggleBookmark}
    />
  );
};

export default ScienceSection;

// volumes ? q = subject : ${ genre }& maxResults=${     maxResults }
