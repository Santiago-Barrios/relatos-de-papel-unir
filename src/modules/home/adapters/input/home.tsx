import { ActiveFilterChips } from '@/components/active-filter-chips/active-filter-chips';
import { SideMenu } from '@/components/side-menu/side-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBookServices } from '@common/context/di-context';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 20;

export const Home = () => {
  const bookService = useBookServices();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const author = searchParams.get('author') || '';
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');
  const page = Math.max(0, parseInt(searchParams.get('page') ?? '0', 10));

  const filters = {
    q: q.trim() || undefined,
    category: category || undefined,
    author: author || undefined,
    priceMin: priceMin ? parseFloat(priceMin) : undefined,
    priceMax: priceMax ? parseFloat(priceMax) : undefined,
    isVisible: true,
    aggregate: true,
    page,
    size: PAGE_SIZE,
  };

  const {
    data: searchResult,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['books', q, category, author, priceMin, priceMax, page],
    queryFn: () => bookService.searchBooks(filters),
  });

  const books = searchResult?.books ?? [];
  const totalPages = searchResult?.totalPages ?? 0;
  const totalElements = searchResult?.totalElements ?? 0;

  const goToPage = (newPage: number) => {
    const nextPage = Math.max(0, Math.min(newPage, totalPages - 1));
    const next = new URLSearchParams(searchParams);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

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

          {totalElements > 0 && (
            <nav className='home__main-container__books__pagination' aria-label='Paginación'>
              <div className='home__main-container__books__pagination__info'>
                Mostrando {page * PAGE_SIZE + 1}-{Math.min((page + 1) * PAGE_SIZE, totalElements)} de{' '}
                {totalElements} libros
              </div>
              {totalPages > 1 && (
                <div className='home__main-container__books__pagination__controls'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 0}
                    aria-label='Página anterior'
                  >
                    <ChevronLeft className='size-4' />
                    Anterior
                  </Button>
                  <span className='home__main-container__books__pagination__page'>
                    Página {page + 1} de {totalPages}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => goToPage(page + 1)}
                    disabled={page >= totalPages - 1}
                    aria-label='Página siguiente'
                  >
                    Siguiente
                    <ChevronRight className='size-4' />
                  </Button>
                </div>
              )}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};
