import { BookService } from '@modules/books/application/book.service';
import type { BookInputServiceInterface } from '@modules/books/domain/ports/book.input-service.interface';
import type { BookOutputRepositoryInterface } from '@modules/books/domain/ports/book.output-repository.interface';
import { CartService } from '@modules/cart/application/cart.service';
import type { CartInputServiceInterface } from '@modules/cart/domain/ports/cart.input-service.interface';
import type { CartOutputRepositoryInterface } from '@modules/cart/domain/ports/cart.output-repository.interface';
import { CheckoutService } from '@modules/checkout/application/checkout.service';
import type { CheckoutInputServiceInterface } from '@modules/checkout/domain/ports/checkout.input-service.interface';
import type { CheckoutOutputRepositoryInterface } from '@modules/checkout/domain/ports/checkout.output-repository.interface';
import { HomeService } from '@modules/home/application/home.service';
import type { HomeInputServiceInterface } from '@modules/home/domain/ports/home.input-service.interface';
import type { HomeOutputRepositoryInterface } from '@modules/home/domain/ports/home.output-repository.interface';
import { LandingService } from '@modules/landing/application/landing.service';
import type { LandingInputServiceInterface } from '@modules/landing/domain/ports/landing.input-service.interface';
import type { LandingOutputRepositoryInterface } from '@modules/landing/domain/ports/landing.output-repository.interface';
import { CategoryService } from '@modules/categories/application/category.service';
import type { CategoryInputServiceInterface } from '@modules/categories/domain/ports/category.input-service.interface';
import type { CategoryOutputRepositoryInterface } from '@modules/categories/domain/ports/category.output-repository.interface';
import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

// Interface principal que contendrá todos los servicios
interface Services {
  book: BookInputServiceInterface;
  cart: CartInputServiceInterface;
  checkout: CheckoutInputServiceInterface;
  home: HomeInputServiceInterface;
  landing: LandingInputServiceInterface;
  category: CategoryInputServiceInterface;
}

interface DIProviderProps {
  children: ReactNode;
  repositories: {
    bookRepository: BookOutputRepositoryInterface;
    cartRepository: CartOutputRepositoryInterface;
    checkoutRepository: CheckoutOutputRepositoryInterface;
    homeRepository: HomeOutputRepositoryInterface;
    landingRepository: LandingOutputRepositoryInterface;
    categoryRepository: CategoryOutputRepositoryInterface;
  };
}

// Creamos el contexto con un valor inicial undefined
const DIContext = createContext<Services | undefined>(undefined);

export const DIProvider = ({ children, repositories }: DIProviderProps) => {
  // Inicializamos los servicios con sus respectivos repositorios
  const services: Services = {
    book: new BookService(repositories.bookRepository),
    cart: new CartService(repositories.cartRepository),
    checkout: new CheckoutService(repositories.checkoutRepository),
    home: new HomeService(repositories.homeRepository),
    landing: new LandingService(repositories.landingRepository),
    category: new CategoryService(repositories.categoryRepository),
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

export const useCartServices = () => {
  const { cart } = useDI();
  return cart;
};

export const useCheckoutServices = () => {
  const { checkout } = useDI();
  return checkout;
};

export const useHomeServices = () => {
  const { home } = useDI();
  return home;
};

export const useLandingServices = () => {
  const { landing } = useDI();
  return landing;
};

export const useCategoryServices = () => {
  const { category } = useDI();
  return category;
};
