import { CartModel, CartItemModel } from '../../domain/cart.model';
import { BookModel } from '@modules/books';

// Datos mock de libros para el carrito
const mockBook1 = BookModel.create({
  id: 1,
  title: 'Cien años de soledad',
  author: 'Gabriel García Márquez',
  code: 'ISBN-001',
  price: 25.99,
  image: 'https://images.example.com/cien-anos-soledad.jpg',
  description:
    'Una de las obras más importantes de la literatura latinoamericana.',
  createdAt: new Date('2024-01-15T10:00:00Z'),
  updatedAt: new Date('2024-01-15T10:00:00Z'),
});

const mockBook2 = BookModel.create({
  id: 2,
  title: 'El Quijote de la Mancha',
  author: 'Miguel de Cervantes',
  code: 'ISBN-002',
  price: 19.99,
  image: 'https://images.example.com/quijote.jpg',
  description: 'La obra cumbre de la literatura española.',
  createdAt: new Date('2024-01-16T10:00:00Z'),
  updatedAt: new Date('2024-01-16T10:00:00Z'),
});

const mockBook3 = BookModel.create({
  id: 3,
  title: '1984',
  author: 'George Orwell',
  code: 'ISBN-003',
  price: 22.5,
  image: 'https://images.example.com/1984.jpg',
  description: 'Una distopía que describe un futuro totalitario.',
  createdAt: new Date('2024-01-17T10:00:00Z'),
  updatedAt: new Date('2024-01-17T10:00:00Z'),
});

export const cartRepositoryMockData: CartModel = CartModel.create({
  items: [
    CartItemModel.create({
      book: mockBook1,
      quantity: 2,
    }),
    CartItemModel.create({
      book: mockBook2,
      quantity: 1,
    }),
    CartItemModel.create({
      book: mockBook3,
      quantity: 3,
    }),
  ],
  total: 25.99 * 2 + 19.99 * 1 + 22.5 * 3, // 51.98 + 19.99 + 67.50 = 139.47
});
