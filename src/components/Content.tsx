import { useEffect, useState } from 'react';
import { MovieCard } from '../components/MovieCard';
import { Header } from './Header';
import { api } from '../services/api';
import '../styles/content.scss';

export interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface ContentProps {
  contentInput: {
    titleSelectedGenre: string,
    selectedGenreId: number,
  }
}

export function Content({ contentInput }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  const { selectedGenreId, titleSelectedGenre } = contentInput;

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header titleSelectedGenre={titleSelectedGenre}/>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}