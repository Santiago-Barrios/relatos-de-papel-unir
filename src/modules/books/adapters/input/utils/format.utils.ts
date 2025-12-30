/**
 * Formats a price value to currency format
 * @param price - The price to format
 * @param currency - The currency symbol (default: '$')
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = '$'): string => {
  return `${currency} ${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

/**
 * Formats a date to a readable string format
 * @param date - The date to format
 * @returns Formatted date string (e.g., "Lunes 24 de Marzo, 2025")
 */
export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('es-ES', options).format(date);
};

/**
 * Calculates discount percentage
 * @param originalPrice - Original price
 * @param discountedPrice - Discounted price
 * @returns Discount percentage
 */
export const calculateDiscount = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Formats availability text
 * @param quantity - Available quantity
 * @returns Formatted availability string
 */
export const formatAvailability = (quantity: number): string => {
  if (quantity > 100) {
    return 'Quedan más de 100 unidades';
  }
  if (quantity > 50) {
    return `Quedan más de 50 unidades`;
  }
  if (quantity > 10) {
    return `Quedan ${quantity} unidades`;
  }
  if (quantity > 0) {
    return `Solo quedan ${quantity} unidades`;
  }
  return 'Agotado';
};
