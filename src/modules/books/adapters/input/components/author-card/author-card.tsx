import { Card, CardContent } from '@/components/ui/card';
import type { BookModel } from '@/modules/books/domain/book.model';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface AuthorCardProps {
  book: BookModel;
  className?: string;
}

export const AuthorCard = ({ book, className = '' }: AuthorCardProps) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!book.authorName) {
    return null;
  }

  return (
    <Card className={`author-card ${className}`.trim()}>
      <CardContent className='author-card__content'>
        <div className='author-card__container'>
          <Avatar className='author-card__avatar'>
            {book.authorPhoto && (
              <AvatarImage src={book.authorPhoto} alt={book.authorName} />
            )}
            <AvatarFallback>{getInitials(book.authorName)}</AvatarFallback>
          </Avatar>
          <div className='author-card__info'>
            <h3 className='author-card__name'>{book.authorName}</h3>
            <Button variant='link' className='author-card__link'>
              Ver Página del Autor
            </Button>
            {book.biography && (
              <>
                <Separator className='author-card__separator' />
                <p className='author-card__biography'>{book.biography}</p>
                <Button variant='link' className='author-card__more-link'>
                  Ver más
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
