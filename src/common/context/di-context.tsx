import { BookService } from '@modules/books/application/book.service';
import type { BookInputServiceInterface } from '@modules/books/domain/ports/book.input-service.interface';
import type { BookOutputRepositoryInterface } from '@modules/books/domain/ports/book.output-repository.interface';
import { CategoryService } from '@modules/categories/application/category.service';
import type { CategoryInputServiceInterface } from '@modules/categories/domain/ports/category.input-service.interface';
import type { CategoryOutputRepositoryInterface } from '@modules/categories/domain/ports/category.output-repository.interface';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

// Interface principal que contendrá todos los servicios
interface Services {
  book: BookInputServiceInterface;
  category: CategoryInputServiceInterface;
  // Aquí se pueden agregar más módulos en el futuro
}

interface DIProviderProps {
  children: ReactNode;
  repositories: {
    bookRepository: BookOutputRepositoryInterface;
    categoryRepository: CategoryOutputRepositoryInterface;
    // Aquí se pueden agregar más repositorios en el futuro
  };
}

// Creamos el contexto con un valor inicial undefined
const DIContext = createContext<Services | undefined>(undefined);

export const DIProvider = ({ children, repositories }: DIProviderProps) => {
  // Inicializamos los servicios con sus respectivos repositorios
  const services: Services = {
    book: new BookService(repositories.bookRepository),
    category: new CategoryService(repositories.categoryRepository),
    // Aquí se pueden agregar más servicios en el futuro
  };

  return <DIContext.Provider value={services}>{children}</DIContext.Provider>;
};

// Hook para acceder al contexto completo
export const useDI = () => {
  const context = useContext(DIContext);
  if (!context) {
    throw new Error('useDI debe ser usado dentro de un DIProvider');
  }
  return context;
};

// Hooks específicos para cada módulo
export const useBookServices = () => {
  const { book } = useDI();
  return book;
};

export const useCategoryServices = () => {
  const { category } = useDI();
  return category;
};

// Aquí se pueden agregar más hooks específicos en el futuro
