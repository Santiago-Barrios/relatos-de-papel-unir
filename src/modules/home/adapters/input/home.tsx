import { useBookServices } from '@common/context/di-context';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const Home = () => {
  const bookService = useBookServices();

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: () => bookService.getBooks(),
  });

  if (isLoading) {
    return (
      <div className='home'>
        <div className='home__loading'>Cargando libros...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='home'>
        <div className='home__error'>Error al cargar los libros</div>
      </div>
    );
  }

  return (
    <div className='home'>
      <h1 className='home__title'>Catálogo de Libros</h1>
      <div className='home__books-grid'>
        {books?.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className='home__book-card'
          >
            {book.image && (
              <div className='home__book-image'>
                <img src={book.image} alt={book.title} />
              </div>
            )}
            <div className='home__book-info'>
              <h2 className='home__book-title'>{book.title}</h2>
              <p className='home__book-author'>{book.author}</p>
              <p className='home__book-price'>${book.price.toFixed(2)}</p>
              <p className='home__book-description'>
                {book.description.length > 100
                  ? `${book.description.substring(0, 100)}...`
                  : book.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
