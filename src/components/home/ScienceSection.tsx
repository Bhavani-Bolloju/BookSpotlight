import GenreSection from "./GenreSection";
import { BookDetailsProp } from "../../firebase/services";
import { memo } from "react";

interface ScienceSectionProp {
  bookmarks: string[];
  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
}

const ScienceSection = memo((props: ScienceSectionProp) => {
  const genre = "science";

  console.log(genre, "current component");

  return (
    <GenreSection
      name="genre"
      title={genre}
      bookmarks={props.bookmarks}
      toggleBookmark={props.toggleBookmark}
    />
  );
});

export default ScienceSection;

// volumes ? q = subject : ${ genre }& maxResults=${     maxResults }
