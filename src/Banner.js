import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";
const baseUrl = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetfixOriginals);
      setMovies(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${baseUrl}${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contants">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_discription">{truncate(movie?.overview, 140)}</h1>
      </div>
      <div className="banner_fadeButton"></div>
    </header>
  );
}

export default Banner;
