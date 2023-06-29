import React, {useState,useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { API_URL } from './context';

const SingleMovie = () => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState("");

    const getMovies = async (url) => {
        setIsLoading(true);
        try {
            const data = await fetch(url);
            const parsedData = await data.json();
            console.log(parsedData);

            if (parsedData.Response === "True") {
                setIsLoading(false);
                console.log("inside");
                setMovie(parsedData);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // debouncing
        let timerOut = setTimeout(() => {
            getMovies(`${API_URL}&i=${id}`);
        }, 1000);
        return () => clearTimeout(timerOut);         //clear extra data
    }, [id])

    if(isLoading){
        return(
            <div className="movie-section">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <section className='movie-section'>
            <div className="movie-card">
                <figure>
                    <img src={movie.Poster} alt="" />
                </figure>
                <div className="card-content">
                    <p className='title'>{movie.Title}</p>
                    <p className=''></p>
                    <p className='card-text'>{movie.Released}</p>
                    <p className='card-text'>{movie.Genre}</p>
                    <p className='card-text'>{movie.imdbRating}/10</p>
                    <p className='card-text'>{movie.Country}</p>
                    <NavLink to="/" className="back-btn">Go back</NavLink>
                </div>
            </div>
        </section>
    )   
}

export default SingleMovie