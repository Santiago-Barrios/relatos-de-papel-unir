import { useBookServices } from '@common/context/di-context';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export const Landing = () => {
  const bookService = useBookServices();

  const { data: books, isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: () => bookService.getBooks(),
  });

  // Mostrar solo los primeros 6 libros como destacados
  const featuredBooks = books?.slice(0, 6) || [];

  return (
    <div className='landing'>
      <div className='landing__hero'>
        <h1 className='landing__title'>Relatos de Papel</h1>
        <p className='landing__subtitle'>
          Descubre tu próxima gran lectura en nuestra librería online
        </p>
        <Link to='/books' className='landing__cta-button'>
          Explorar Catálogo
        </Link>
      </div>

      {isLoading ? (
        <div className='landing__loading'>Cargando libros destacados...</div>
      ) : (
        <div className='landing__featured'>
          <h2 className='landing__featured-title'>Libros Destacados</h2>
          <div className='landing__books-grid'>
            {featuredBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className='landing__book-card'
              >
                {book.image && (
                  <div className='landing__book-image'>
                    <img src={book.image} alt={book.title} />
                  </div>
                )}
                <div className='landing__book-info'>
                  <h3 className='landing__book-title'>{book.title}</h3>
                  <p className='landing__book-author'>{book.author}</p>
                  <p className='landing__book-price'>
                    ${book.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Link to='/books' className='landing__view-all'>
            Ver todos los libros →
          </Link>
        </div>
      )}
    </div>
  );
};
