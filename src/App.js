import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import MovieList from './Components/MovieList';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox';
import AddFavourites from './Components/AddFavourites';
import RemoveFavourites from './Components/RemoveFavourites';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=de10611b`
    const response = await fetch(url);
    const responeJson = await response.json();
    if (responeJson.Search) setMovies(responeJson.Search)

  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])
  useEffect(()=>{
    const movieFavourites=JSON.parse(localStorage.getItem('react-movie-app-fav'));
    setFavourites(movieFavourites);
  },[])

  const saveToLocalStorage=(items)=>{
    localStorage.setItem('react-movie-app-fav',JSON.stringify(items));
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  const RemoveFavouritesMovie=(movie)=>{
    const newFavouriteList=favourites.filter((favourite)=>favourite.imdbID!==movie.imdbID);
    setFavourites(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          favouriteComponent={AddFavourites}
          handleFavouritesClick={addFavouriteMovie}
          movies={movies} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Favourites' />
      </div>
      <div className="row">
        <MovieList
          favouriteComponent={RemoveFavourites}
          handleFavouritesClick={RemoveFavouritesMovie}
          movies={favourites} />
      </div>
    </div>
  );
}

export default App;
