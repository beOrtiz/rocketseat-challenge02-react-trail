import { useState } from 'react';
import { Content } from './components/Content';
import { GenreResponseProps, SideBar } from './components/SideBar';
import './styles/global.scss';

interface SideBarInput {
  selectedGenreId: number,
  setSelectedGenre: (selectedGenre: GenreResponseProps) => void,
  setSelectedGenreId: (id: number) => void,
}

interface ContentInput {
  titleSelectedGenre: string,
  selectedGenreId: number,
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  const sideBarInput = {
    selectedGenreId,
    setSelectedGenre,
    setSelectedGenreId,
  } as SideBarInput;

  const contentInput = {
    selectedGenreId,
    titleSelectedGenre: selectedGenre.title,
  } as ContentInput;

  return (
    <div className="main">
      <SideBar sideBarInput={sideBarInput} />
      <Content contentInput={contentInput} />
    </div>
  )
}