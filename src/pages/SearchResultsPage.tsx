// import React from 'react'
import { useParams } from "react-router";

import classes from "./SearchResultsPage.module.scss";
function SearchResultsPage() {
  const params = useParams();
  console.log(params.id);

  return (
    <section className={classes.searchResults}>{params.id} results</section>
  );
}

export default SearchResultsPage;
