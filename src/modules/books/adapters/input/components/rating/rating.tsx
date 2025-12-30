import { Star } from 'lucide-react';

interface RatingProps {
  rating: number; // 0-5
  maxRating?: number;
  className?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating = ({
  rating,
  maxRating = 5,
  className = '',
  showValue = false,
  size = 'md',
}: RatingProps) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={`rating ${className}`.trim()}>
      <div className='rating__stars'>
        {Array.from({ length: maxRating }).map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= filledStars;
          const isHalfFilled = starNumber === filledStars + 1 && hasHalfStar;

          return (
            <Star
              key={index}
              className={`rating__star rating__star--${size} ${
                isFilled
                  ? 'rating__star--filled'
                  : isHalfFilled
                    ? 'rating__star--half'
                    : 'rating__star--empty'
              }`}
            />
          );
        })}
      </div>
      {showValue && <span className='rating__value'>{rating.toFixed(1)}</span>}
    </div>
  );
};
