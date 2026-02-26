import { ActiveFilterChips } from '@/components/active-filter-chips/active-filter-chips';
import { SideMenu } from '@/components/side-menu/side-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useBookServices } from '@common/context/di-context';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

export const Home = () => {
  const bookService = useBookServices();
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const author = searchParams.get('author') || '';
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');

  const filters = {
    q: q.trim() || undefined,
    category: category || undefined,
    author: author || undefined,
    priceMin: priceMin ? parseFloat(priceMin) : undefined,
    priceMax: priceMax ? parseFloat(priceMax) : undefined,
    isVisible: true,
    aggregate: true,
  };

  const {
    data: searchResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books', q, category, author, priceMin, priceMax],
    queryFn: () => bookService.searchBooks(filters),
  });

  const books = searchResult?.books ?? [];

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
          <SideMenu aggregations={searchResult?.aggregations ?? {}} />
        </aside>
        <div className='home__main-container__books'>
          <h1 className='home__title'>Catálogo de Libros</h1>
          <ActiveFilterChips />

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
                        {book.author ?? book.authorName ?? 'Autor no especificado'}
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
