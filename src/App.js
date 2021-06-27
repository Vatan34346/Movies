import React, { useState, useEffect, useCallback } from "react";
import AddMovie from './components/AddMovie';
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fatchMoviesHandler = useCallback(async () => {
    setIsloading(true);

    //promis
    //  fetch('https://swapi.dev/api/films').then(res=>{
    //    return res.json();
    //  }).then(data=>{
    //    const trnsformedMovies=data.results.map(item=>{
    //      return {
    //        id:item.episod_id,
    //        title:item.title,
    //        openingText:item.opening_crawl,
    //        releaseDate:item.release_date
    //      }
    // //    });
    //    setMovies(trnsformedMovies);
    //  });

    try {
      const responce = await fetch("https://test-react-ac609-default-rtdb.firebaseio.com/movies.json");

      if (!responce.ok) {
        throw new Error("Somthing went wrong!");
      }
      const data = await responce.json();

      const loaded =[];


      for(const key in data){
        loaded.push({
            id:key,
            title:data[key].title,
            openingText:data[key].openingText,
            releaseDate:data[key].releaseDate
        });
      }

  
      setMovies(loaded);
    } catch (error) {
      setError(error.message);
    }
    setIsloading(false);
  }, []);

  useEffect(() => {
    fatchMoviesHandler();
  }, [fatchMoviesHandler]);

 async function addMovieHandler(movie){
  const responce=await fetch('https://test-react-ac609-default-rtdb.firebaseio.com/movies.json',{
     method:'POST',
     body:JSON.stringify(movie),
     headers:{
       'Content-Type':'application/json'
     }
   });

   const data=await responce.json();

   console.log(data);
  }

  let contant = <p>Found no movies</p>;

  if (movies.length > 0) {
    contant = <MoviesList movies={movies} />;
  }
  if (error) {
    contant = <p>{error}</p>;
  }

  if (isLoading) {
    contant = <p>Loading..</p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
      <section>
        <button onClick={fatchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{contant}</section>
    </React.Fragment>
  );
}

export default App;
