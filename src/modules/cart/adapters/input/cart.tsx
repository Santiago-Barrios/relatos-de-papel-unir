import { Link } from 'react-router-dom';
import { useCart } from '../context/cart-context';

export const Cart = () => {
  const { items, removeFromCart, clearCart, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className='cart'>
        <h1 className='cart__title'>Carrito de Compras</h1>
        <div className='cart__empty'>
          <p>Tu carrito está vacío</p>
          <Link to='/books' className='cart__browse-link'>
            Explorar libros
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='cart'>
      <div className='cart__header'>
        <h1 className='cart__title'>Carrito de Compras</h1>
        <button onClick={clearCart} className='cart__clear-button'>
          Vaciar carrito
        </button>
      </div>

      <div className='cart__items'>
        {items.map(item => (
          <div key={item.book.id} className='cart__item'>
            <div className='cart__item-image'>
              {item.book.image ? (
                <img src={item.book.image} alt={item.book.title} />
              ) : (
                <div className='cart__item-placeholder'>Sin imagen</div>
              )}
            </div>
            <div className='cart__item-info'>
              <Link to={`/book/${item.book.id}`} className='cart__item-title'>
                {item.book.title}
              </Link>
              <p className='cart__item-author'>{item.book.author}</p>
              <div className='cart__item-details'>
                <span className='cart__item-quantity'>
                  Cantidad: {item.quantity}
                </span>
                <span className='cart__item-price'>
                  ${(item.book.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.book.id)}
              className='cart__item-remove'
              aria-label='Eliminar del carrito'
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className='cart__summary'>
        <div className='cart__total'>
          <span className='cart__total-label'>Total:</span>
          <span className='cart__total-amount'>${getTotal().toFixed(2)}</span>
        </div>
        <Link to='/checkout' className='cart__checkout-button'>
          Proceder al Checkout
        </Link>
      </div>
    </div>
  );
};
