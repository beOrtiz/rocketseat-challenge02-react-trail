import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';
import '../styles/sidebar.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  sideBarInput: {
    selectedGenreId: number,
    setSelectedGenre: (selectedGenre: GenreResponseProps) => void,
    setSelectedGenreId: (id: number) => void
  }
}

export function SideBar({ sideBarInput }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const { selectedGenreId, setSelectedGenre, setSelectedGenreId} = sideBarInput;

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}