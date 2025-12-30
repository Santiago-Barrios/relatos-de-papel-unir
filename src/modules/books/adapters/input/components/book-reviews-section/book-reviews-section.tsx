import { ReviewModel } from '../../../../domain/review.model';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rating } from '../rating/rating';
import { formatDate } from '../../utils/format.utils';
import { CheckCircle2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface BookReviewsSectionProps {
  reviews: ReviewModel[];
  averageRating?: number;
  totalReviews?: number;
  className?: string;
}

export const BookReviewsSection = ({
  reviews,
  averageRating,
  totalReviews,
  className = '',
}: BookReviewsSectionProps) => {
  const calculateAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  const avgRating = averageRating ?? calculateAverageRating();
  const total = totalReviews ?? reviews.length;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => Math.floor(r.rating) === rating).length;
    const percentage = total > 0 ? (count / total) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <div className={`book-reviews-section ${className}`.trim()}>
      <Card className='book-reviews-section__container'>
        <CardHeader>
          <CardTitle>Reseñas del libro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='book-reviews-section__summary'>
            <div className='book-reviews-section__rating-header'>
              <Rating rating={avgRating} size='lg' showValue />
              <span className='book-reviews-section__total'>
                {total} opiniones
              </span>
            </div>
            <div className='book-reviews-section__distribution'>
              {ratingDistribution.map(dist => (
                <div
                  key={dist.rating}
                  className='book-reviews-section__distribution-item'
                >
                  <span className='book-reviews-section__distribution-label'>
                    {dist.rating} estrellas
                  </span>
                  <div className='book-reviews-section__distribution-bar'>
                    <div
                      className='book-reviews-section__distribution-fill'
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <span className='book-reviews-section__distribution-percentage'>
                    {dist.percentage.toFixed(0)}% ({dist.count})
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator className='book-reviews-section__separator' />

          <div className='book-reviews-section__reviews'>
            {reviews.map((review, index) => (
              <div key={review.id} className='book-reviews-section__review'>
                <div className='book-reviews-section__review-header'>
                  <div className='book-reviews-section__review-info'>
                    <div className='book-reviews-section__review-user'>
                      <span className='book-reviews-section__review-name'>
                        {review.user}
                      </span>
                      <CheckCircle2 className='book-reviews-section__verified-icon' />
                      <span className='book-reviews-section__verified-text'>
                        Compra Verificada
                      </span>
                    </div>
                    <Rating
                      rating={review.rating}
                      size='sm'
                      className='book-reviews-section__review-rating'
                    />
                    <p className='book-reviews-section__review-date'>
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
                <p className='book-reviews-section__review-text'>
                  {review.description}
                </p>
                <div className='book-reviews-section__review-actions'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='book-reviews-section__helpful-button book-reviews-section__helpful-button--positive'
                  >
                    <ThumbsUp className='book-reviews-section__action-icon' />
                    Esta opinión es útil
                    <span className='book-reviews-section__helpful-count'>
                      (0)
                    </span>
                  </Button>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='book-reviews-section__helpful-button'
                  >
                    <ThumbsDown className='book-reviews-section__action-icon' />
                    No es útil
                    <span className='book-reviews-section__helpful-count'>
                      (0)
                    </span>
                  </Button>
                </div>
                {index < reviews.length - 1 && (
                  <Separator className='book-reviews-section__review-separator' />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
