// context is like warehouse
// provider (delivery)
// consumer(you i.e. user) -> uses useContext
import React, { useContext, useEffect, useState } from 'react'

const apiKey = process.env.REACT_APP_API_KEY
export const API_URL = `https://www.omdbapi.com/?apikey=${apiKey}`;
const AppContext = React.createContext();

// Provider function
const AppProvider = ({ children }) => {

  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: "false", msg: "" })
  const [query, setQuery] = useState('Titanic')

  const getMovies = async (url) => {
    setIsLoading(true);
    try {
      const data = await fetch(url);
      const parsedData = await data.json();
      console.log(parsedData);

      if (parsedData.Response === "True") {
        setIsLoading(false);
        setMovie(parsedData.Search);
        setIsError({
          show: false,
          msg: ""
        });
      }
      else {
        setIsError({
          show: true,
          msg: parsedData.Error
        });
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // debouncing
    let timerOut=setTimeout(() => {
      getMovies(`${API_URL}&s=${query}`);
    }, 800);
    return ()=>clearTimeout(timerOut)
  }, [query])

  return <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery }}> {children} </AppContext.Provider>
};

// global custom hooks
const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };