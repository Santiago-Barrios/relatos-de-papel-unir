import { SideMenu } from '@/components/side-menu/side-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
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
      <div className='home__main-container'>
        <aside className='home__main-container__side-menu'>
          <SideMenu />
        </aside>
        <div className='home__main-container__books'>
          <h1 className='home__title'>Catálogo de Libros</h1>

          <div className='home__main-container__books__books-grid'>
            {books?.map(book => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className='home__main-container__books__book-card'
              >
                <Card style={{ height: '100%' }}>
                  <CardContent>
                    {book.image && (
                      <div className='home__main-container__books__book-image'>
                        <img src={book.image} alt={book.title} />
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <div className='home__main-container__books__book-info'>
                      <span className='home__main-container__books__book-info__book-title'>
                        {book.title}
                      </span>
                      <span className='home__main-container__books__book-info__book-author'>
                        {book.author}
                      </span>
                      <span className='home__main-container__books__book-info__book-price'>
                        ${book.price.toFixed(2)}
                      </span>
                      <span className='home__main-container__books__book-info__book-description'>
                        {book.description.length > 100
                          ? `${book.description.substring(0, 100)}...`
                          : book.description}
                      </span>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
