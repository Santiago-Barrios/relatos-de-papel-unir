import { useCart } from '@modules/cart/context/cart-context';
import { useCheckoutServices } from '@common/context/di-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Checkout = () => {
  const { items, getTotal, clearCart } = useCart();
  const checkoutService = useCheckoutServices();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    tarjeta: '',
    vencimiento: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const purchaseItems = items.map(item => ({
        bookId: item.book.id,
        quantity: item.quantity,
      }));
      await checkoutService.processCheckout(purchaseItems);
      clearCart();
      navigate('/books');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al procesar la compra';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className='checkout'>
        <h1 className='checkout__title'>Checkout</h1>
        <div className='checkout__empty'>
          <p>Tu carrito está vacío</p>
          <Link to='/books' className='checkout__browse-link'>
            Explorar libros
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getTotal();
  const envio = 5.99;
  const total = subtotal + envio;

  return (
    <div className='checkout'>
      <div className='checkout__main-container'>
        <div className='checkout__main-container__form-section'>
          <Card className='checkout__main-container__form-section__paiment-card'>
            <CardHeader>
              <CardTitle className='checkout__main-container__form-section__section-title'>
                Datos de Envío
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className='checkout__main-container__form-section__form'
              >
                <div className='checkout__main-container__form-section__form-row'>
                  <div className='checkout__main-container__form-section__form-field'>
                    <label
                      htmlFor='nombre'
                      className='checkout__main-container__form-section__form-label'
                    >
                      Nombre
                    </label>
                    <Input
                      id='nombre'
                      name='nombre'
                      type='text'
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='checkout__main-container__form-section__form-field'>
                    <label
                      htmlFor='apellidos'
                      className='checkout__main-container__form-section__form-label'
                    >
                      Apellidos
                    </label>
                    <Input
                      id='apellidos'
                      name='apellidos'
                      type='text'
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className='checkout__main-container__form-section__form-field'>
                  <label
                    htmlFor='email'
                    className='checkout__main-container__form-section__form-label'
                  >
                    Email
                  </label>
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='checkout__main-container__form-section__form-field'>
                  <label
                    htmlFor='telefono'
                    className='checkout__main-container__form-section__form-label'
                  >
                    Teléfono
                  </label>
                  <Input
                    id='telefono'
                    name='telefono'
                    type='tel'
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='checkout__main-container__form-section__form-field'>
                  <label
                    htmlFor='direccion'
                    className='checkout__main-container__form-section__form-label'
                  >
                    Dirección
                  </label>
                  <Input
                    id='direccion'
                    name='direccion'
                    type='text'
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='checkout__main-container__form-section__form-row'>
                  <div className='checkout__main-container__form-section__form-field'>
                    <label
                      htmlFor='ciudad'
                      className='checkout__main-container__form-section__form-label'
                    >
                      Ciudad
                    </label>
                    <Input
                      id='ciudad'
                      name='ciudad'
                      type='text'
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='checkout__main-container__form-section__form-field'>
                    <label
                      htmlFor='codigoPostal'
                      className='checkout__main-container__form-section__form-label'
                    >
                      Código Postal
                    </label>
                    <Input
                      id='codigoPostal'
                      name='codigoPostal'
                      type='text'
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <CardHeader className='checkout__main-container__form-section__payment-header'>
                  <CardTitle className='checkout__main-container__form-section__section-title'>
                    Datos de Pago
                  </CardTitle>
                </CardHeader>

                <div className='checkout__main-container__form-section__form-field'>
                  <label
                    htmlFor='tarjeta'
                    className='checkout__main-container__form-section__form-label'
                  >
                    Número de Tarjeta
                  </label>
                  <Input
                    id='tarjeta'
                    name='tarjeta'
                    type='text'
                    placeholder='1234 5678 9012 3456'
                    value={formData.tarjeta}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className='checkout__main-container__form-section__form-row'>
                  <div className='checkout__main-container__form-section__form-field'>
                    <label
                      htmlFor='vencimiento'
                      className='checkout__main-container__form-section__form-label'
                    >
                      Fecha de Vencimiento
                    </label>
                    <Input
                      id='vencimiento'
                      name='vencimiento'
                      type='text'
                      placeholder='MM/AA'
                      value={formData.vencimiento}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className='checkout__main-container__form-section__form-field'>
                    <label
                      htmlFor='cvv'
                      className='checkout__main-container__form-section__form-label'
                    >
                      CVV
                    </label>
                    <Input
                      id='cvv'
                      name='cvv'
                      type='text'
                      placeholder='123'
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className='checkout__main-container__summary-section'>
          <Card className='checkout__main-container__summary-section__summary-card'>
            <CardHeader>
              <CardTitle className='checkout__main-container__summary-section__section-title'>
                Resumen del Pedido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='checkout__main-container__summary-section__items'>
                {items.map(item => (
                  <div
                    key={item.book.id}
                    className='checkout__main-container__summary-section__item'
                  >
                    <div className='checkout__main-container__summary-section__item-image'>
                      {item.book.image ? (
                        <img src={item.book.image} alt={item.book.title} />
                      ) : (
                        <div className='checkout__main-container__summary-section__item-placeholder'>
                          Sin imagen
                        </div>
                      )}
                    </div>
                    <div className='checkout__main-container__summary-section__item-info'>
                      <span className='checkout__main-container__summary-section__item-info__title'>
                        {item.book.title}
                      </span>
                      <span className='checkout__main-container__summary-section__item-info__author'>
                        {item.book.author}
                      </span>
                      <div className='checkout__main-container__summary-section__item-info__details'>
                        <span className='checkout__main-container__summary-section__item-info__quantity'>
                          Cantidad: {item.quantity}
                        </span>
                        <span className='checkout__main-container__summary-section__item-info__price'>
                          ${(item.book.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='checkout__main-container__summary-section__totals'>
                <div className='checkout__main-container__summary-section__total-row'>
                  <span className='checkout__main-container__summary-section__total-label'>
                    Subtotal:
                  </span>
                  <span className='checkout__main-container__summary-section__total-value'>
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className='checkout__main-container__summary-section__total-row'>
                  <span className='checkout__main-container__summary-section__total-label'>
                    Envío:
                  </span>
                  <span className='checkout__main-container__summary-section__total-value'>
                    ${envio.toFixed(2)}
                  </span>
                </div>
                <div className='checkout__main-container__summary-section__total-row checkout__main-container__summary-section__total-row--final'>
                  <span className='checkout__main-container__summary-section__total-label'>
                    Total:
                  </span>
                  <span className='checkout__main-container__summary-section__total-amount'>
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {error && (
                <p className='checkout__main-container__summary-section__error'>
                  {error}
                </p>
              )}
              <Button
                onClick={handleSubmit}
                className='checkout__main-container__summary-section__confirm-button'
                size='lg'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Compra'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
