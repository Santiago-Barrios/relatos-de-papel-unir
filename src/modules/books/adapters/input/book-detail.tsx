import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { useBookServices } from '@common/context/di-context';
import { useCart } from '@modules/cart/context/cart-context';

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

  if (isLoading) {
    return (
      <div className='book-detail'>
        <div className='book-detail__loading'>Cargando libro...</div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className='book-detail'>
        <div className='book-detail__error'>Libro no encontrado</div>
        <Link to='/books' className='book-detail__back-link'>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <div className='book-detail'>
      <Link to='/books' className='book-detail__back-link'>
        <i className='fa-solid fa-left-long'></i>
        <span className='book-detail__back-link__text'>Volver al catálogo</span>
      </Link>
      <div className='book-detail__container'>
        <div className='book-detail__image-section'>
          {book.image ? (
            <img
              src={book.image}
              alt={book.title}
              className='book-detail__image'
            />
          ) : (
            <div className='book-detail__image-placeholder'>Sin imagen</div>
          )}
        </div>
        <div className='book-detail__info-section'>
          <h1 className='book-detail__title'>{book.title}</h1>
          <p className='book-detail__author'>Por {book.author}</p>
          <p className='book-detail__code'>Código: {book.code}</p>
          <p className='book-detail__price'>${book.price.toFixed(2)}</p>
          <p className='book-detail__description'>{book.description}</p>
          <button onClick={handleAddToCart} className='book-detail__add-button'>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
