import React, { useState, useEffect } from "react";
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
// import requests from "./requests";
import "./Row.css";
const baseUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      //   console.table(request);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //   console.table(movies);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })

        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <dir className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              className={`row_poster ${isLargeRow && "row_poster_large"} `}
              key={movie.id}
              onClick={() => {
                handleClick(movie);
              }}
              // onClick={() => }
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </dir>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
