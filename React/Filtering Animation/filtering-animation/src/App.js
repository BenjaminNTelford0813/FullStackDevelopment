import './App.css';
import {useEffect, useState} from 'react';
import Movie from './Movie';
import Filter from './Filter';

function App() {

  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopularMovies();
  },[]);

const fetchPopularMovies = async () => {
  const dataFromApi = await fetch ('https://api.themoviedb.org/3/movie/popular?api_key=e03354548d1fec9ca11d314ea7a6129d&language=en-US&page=1');
  const movies = await dataFromApi.json();
  setPopular(movies.results);
  setFiltered(movies.results);

}
  return (
    <div className="App">
      <div className="popular-movies">
        <Filter popular={popular} setFiltered={setFiltered}/>
        {popular.map((movie) => {
          return <Movie key={movie.id} movie={movie}/>;
        })}
      </div>
    </div>
  );
}

export default App;
