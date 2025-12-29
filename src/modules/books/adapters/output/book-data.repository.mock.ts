import { BookModel } from '../../domain/book.model';

export const bookRepositoryMockData: BookModel[] = [
  BookModel.create({
    id: 1,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    code: 'ISBN-001',
    price: 25.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027126/100_cbusbr.png',
    description:
      'Una de las obras más importantes de la literatura latinoamericana que narra la historia de la familia Buendía a lo largo de siete generaciones.',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
  }),
  BookModel.create({
    id: 2,
    title: 'El Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    code: 'ISBN-002',
    price: 19.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027357/quijote_qdx3n5.png',
    description:
      'La obra cumbre de la literatura española que narra las aventuras de Don Quijote y su fiel escudero Sancho Panza.',
    createdAt: new Date('2024-01-16T10:00:00Z'),
    updatedAt: new Date('2024-01-16T10:00:00Z'),
  }),
  BookModel.create({
    id: 3,
    title: '1984',
    author: 'George Orwell',
    code: 'ISBN-003',
    price: 22.5,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027126/100_cbusbr.png',
    description:
      'Una distopía que describe un futuro totalitario donde el Gran Hermano controla cada aspecto de la vida de las personas.',
    createdAt: new Date('2024-01-17T10:00:00Z'),
    updatedAt: new Date('2024-01-17T10:00:00Z'),
  }),
  BookModel.create({
    id: 4,
    title: 'El amor en los tiempos del cólera',
    author: 'Gabriel García Márquez',
    code: 'ISBN-004',
    price: 24.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027356/colera_rbyazx.png',
    description:
      'Una historia de amor que se desarrolla a lo largo de más de cincuenta años, desde la juventud hasta la vejez.',
    createdAt: new Date('2024-01-18T10:00:00Z'),
    updatedAt: new Date('2024-01-18T10:00:00Z'),
  }),
  BookModel.create({
    id: 5,
    title: 'La sombra del viento',
    author: 'Carlos Ruiz Zafón',
    code: 'ISBN-005',
    price: 21.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027126/100_cbusbr.png',
    description:
      'Una novela misteriosa ambientada en la Barcelona de posguerra que sigue a un joven en busca de un libro maldito.',
    createdAt: new Date('2024-01-19T10:00:00Z'),
    updatedAt: new Date('2024-01-19T10:00:00Z'),
  }),
  BookModel.create({
    id: 6,
    title: 'El código Da Vinci',
    author: 'Dan Brown',
    code: 'ISBN-006',
    price: 18.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027356/daVinci_pb4oip.png',
    description:
      'Un thriller que combina misterio, historia y religión en una trama llena de secretos y conspiraciones.',
    createdAt: new Date('2024-01-20T10:00:00Z'),
    updatedAt: new Date('2024-01-20T10:00:00Z'),
  }),
  BookModel.create({
    id: 7,
    title: 'Harry Potter y la piedra filosofal',
    author: 'J.K. Rowling',
    code: 'ISBN-007',
    price: 16.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027356/harry_ixoq80.png',
    description:
      'El primer libro de la saga que narra las aventuras del joven mago Harry Potter en el mundo de la magia.',
    createdAt: new Date('2024-01-21T10:00:00Z'),
    updatedAt: new Date('2024-01-21T10:00:00Z'),
  }),
  BookModel.create({
    id: 8,
    title: 'El señor de los anillos',
    author: 'J.R.R. Tolkien',
    code: 'ISBN-008',
    price: 28.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027356/anillos_rlluvo.png',
    description:
      'Una épica aventura en la Tierra Media donde un hobbit debe destruir un anillo de poder para salvar el mundo.',
    createdAt: new Date('2024-01-22T10:00:00Z'),
    updatedAt: new Date('2024-01-22T10:00:00Z'),
  }),
  BookModel.create({
    id: 9,
    title: 'Orgullo y prejuicio',
    author: 'Jane Austen',
    code: 'ISBN-009',
    price: 17.99,
    image:
      'https://res.cloudinary.com/djyftxmll/image/upload/v1767027356/colera_rbyazx.png',
    description:
      'Una novela romántica que explora las relaciones sociales y el matrimonio en la Inglaterra del siglo XIX.',
    createdAt: new Date('2024-01-23T10:00:00Z'),
    updatedAt: new Date('2024-01-23T10:00:00Z'),
  }),
];
