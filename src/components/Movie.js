import React from 'react'
import { useGlobalContext } from './context'
import { NavLink } from 'react-router-dom/dist';

const imgUrl = "https://via.placeholder.com/200/200";

const Movie = () => {
  const { movie, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <div className="loading">Loading...</div>
    )
  }
  return (
    <section className="movie-page">
      <div className="container grid grid-4-col">
        {movie ?
          movie.map((currMovie) => {
            const { imdbID, Title, Poster } = currMovie;
            return (
              <NavLink to={`movie/${imdbID}`} key={imdbID}>
                <div className="card">
                  <div className="card-info">
                    <h2>
                      {Title.length > 13 ? `${Title.substring(0, 15)}...` : Title}
                    </h2>
                    <img src={Poster==="N/A"?imgUrl:Poster} alt="#" />
                  </div>
                </div>
              </NavLink>
            )
          })
          : ""}
      </div>
    </section>
  );
};

export default Movie

