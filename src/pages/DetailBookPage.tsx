// import React from 'react'
import { useParams } from "react-router-dom";
import useFetch from "../components/custom-fetch/useFetch";

function DetailBookPage() {
  const params = useParams();
  console.log(params.id);

  // const { error, data, isLoading } = useFetch(`volumes/m-AWQWmnICYC`);

  // console.log(data);

  // console.log(import.meta.env.VITE_GOOGLE_API_KEY);

  return (
    <div>
      <h2>detail book page</h2>
    </div>
  );
}

export default DetailBookPage;
