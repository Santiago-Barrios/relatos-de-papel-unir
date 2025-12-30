import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { useBookServices } from '@common/context/di-context';
import { useCart } from '@modules/cart/context/cart-context';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Rating } from './components';
import {
  BookInfoTable,
  BookPriceSection,
  BookReviewsSection,
  AuthorCard,
} from './components';
import { reviewRepositoryMockData } from '../output/review-data.repository.mock';
import { useMemo } from 'react';
import './book-detail.scss';

export const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const bookService = useBookServices();
  const { addToCart } = useCart();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['book', id],
    queryFn: () => bookService.getBookById(Number(id)),
    enabled: !!id,
  });

  const reviews = useMemo(() => {
    if (!book?.id) return [];
    return reviewRepositoryMockData[book.id] || [];
  }, [book?.id]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
    }
  };

  const handleAddToWishlist = () => {
    // TODO: Implement wishlist functionality
    console.log('Add to wishlist');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share book');
  };

  if (isLoading) {
    return (
      <div className='book-detail'>
        <Skeleton className='book-detail__loading-skeleton' />
        <div className='book-detail__container'>
          <div className='book-detail__image-section'>
            <Skeleton className='book-detail__image-skeleton' />
          </div>
          <div className='book-detail__info-section'>
            <Skeleton className='book-detail__info-skeleton book-detail__info-skeleton--title' />
            <Skeleton className='book-detail__info-skeleton' />
            <Skeleton className='book-detail__info-skeleton' />
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className='book-detail'>
        <Card className='book-detail__error-card'>
          <CardContent className='book-detail__error-content'>
            <h2 className='book-detail__error-title'>Libro no encontrado</h2>
            <Link to='/books'>
              <Button variant='outline'>Volver al catálogo</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='book-detail'>
      <Link to='/books' className='book-detail__back-link'>
        <Button variant='ghost' className='book-detail__back-button'>
          <ArrowLeft className='book-detail__back-icon' />
          Volver al catálogo
        </Button>
      </Link>

      <div className='book-detail__container'>
        {/* Left Column - Book Image and Info Table */}
        <div className='book-detail__left-column'>
          <Card className='book-detail__image-card'>
            <CardContent className='book-detail__image-content'>
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className='book-detail__image'
                />
              ) : (
                <div className='book-detail__image-placeholder'>Sin imagen</div>
              )}
            </CardContent>
          </Card>
          <BookInfoTable book={book} />
        </div>

        {/* Right Column - Book Details and Price */}
        <div className='book-detail__right-column'>
          <div className='book-detail__header'>
            <h1 className='book-detail__title'>{book.title}</h1>
            <div className='book-detail__meta'>
              <span className='book-detail__author'>Por {book.author}</span>
              <span className='book-detail__meta-separator'>•</span>
              <span className='book-detail__code'>{book.code}</span>
            </div>
            {reviews.length > 0 && (
              <div className='book-detail__rating-container'>
                <Rating rating={averageRating} showValue />
                <span className='book-detail__reviews-count'>
                  ({reviews.length} opiniones)
                </span>
              </div>
            )}
          </div>

          <Separator className='book-detail__separator' />

          <div className='book-detail__description-section'>
            <h2 className='book-detail__description-title'>Reseña del libro</h2>
            <p className='book-detail__description-text'>{book.description}</p>
          </div>

          <Separator className='book-detail__separator' />

          {/* Price Section */}
          <BookPriceSection
            book={book}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onShare={handleShare}
          />
        </div>
      </div>

      {/* Author Card */}
      <div className='book-detail__author-section'>
        <AuthorCard book={book} />
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className='book-detail__reviews-section'>
          <BookReviewsSection reviews={reviews} />
        </div>
      )}
    </div>
  );
};
