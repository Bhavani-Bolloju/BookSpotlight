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
  // const maxResults = 8;
  // const url = `volumes?q=subject:${genre}&maxResults=${maxResults}&`;

  // console.log(props, "science section");

  return (
    <GenreSection
      name="genre"
      title={genre}
      bookmarks={props.bookmarks}
      toggleBookmark={props.toggleBookmark}
    ></GenreSection>
  );
};

export default ScienceSection;

// volumes ? q = subject : ${ genre }& maxResults=${     maxResults }
