import '../styles/header.scss';

interface HeaderProps {
    titleSelectedGenre: string;
}
export function Header({ titleSelectedGenre }: HeaderProps) {
    return (
        <header>
            <span className="category">Categoria:<span> {titleSelectedGenre}</span></span>
        </header>
    );
}