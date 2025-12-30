import { ReviewModel } from '../../domain/review.model';

/**
 * Mock reviews data for books
 * Key: bookId, Value: array of reviews
 */
export const reviewRepositoryMockData: Record<number, ReviewModel[]> = {
  1: [
    ReviewModel.create({
      id: 1,
      user: 'Francisco Leon Ruiz',
      date: new Date('2025-03-20T10:00:00Z'),
      description:
        'Excelente libro, una obra maestra de la literatura latinoamericana. La narrativa de García Márquez es simplemente impresionante.',
      rating: 5,
    }),
    ReviewModel.create({
      id: 2,
      user: 'Kelly Paola Valverde Calderón',
      date: new Date('2025-03-18T14:30:00Z'),
      description:
        'Una historia fascinante que te transporta a Macondo. Muy recomendado para los amantes de la literatura.',
      rating: 5,
    }),
    ReviewModel.create({
      id: 3,
      user: 'María González',
      date: new Date('2025-03-15T09:15:00Z'),
      description:
        'Buen libro pero un poco complejo de seguir al principio. Una vez que le agarras el ritmo, es muy disfrutable.',
      rating: 4,
    }),
  ],
  2: [
    ReviewModel.create({
      id: 4,
      user: 'Juan Pérez',
      date: new Date('2025-03-22T11:00:00Z'),
      description:
        'Una obra clásica que todo amante de la literatura debe leer. Don Quijote es un personaje único e inolvidable.',
      rating: 5,
    }),
    ReviewModel.create({
      id: 5,
      user: 'Ana Martínez',
      date: new Date('2025-03-19T16:45:00Z'),
      description:
        'Aunque es una obra maestra, puede resultar difícil de leer debido al lenguaje antiguo. Recomendado para lectores pacientes.',
      rating: 4,
    }),
  ],
  3: [
    ReviewModel.create({
      id: 6,
      user: 'Carlos Rodríguez',
      date: new Date('2025-03-21T13:20:00Z'),
      description:
        'Una distopía aterradora y muy relevante en nuestros tiempos. Orwell tenía una visión increíble del futuro.',
      rating: 5,
    }),
    ReviewModel.create({
      id: 7,
      user: 'Laura Sánchez',
      date: new Date('2025-03-17T10:30:00Z'),
      description:
        'Libro impactante que te hace reflexionar sobre la sociedad y el poder. Muy recomendado.',
      rating: 5,
    }),
  ],
};
