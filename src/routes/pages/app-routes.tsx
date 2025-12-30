import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { useMemo } from 'react';
import { Home } from '@modules/home';
import { Landing } from '@modules/landing';
import { Checkout } from '@modules/checkout';
import { BookDetail } from '@modules/books';

const AppRoutes = () => {
  // Crear el router dentro del componente para que los elementos
  // se rendericen dentro del contexto correcto
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: '/',
          element: <Landing />,
        },
        {
          path: '/books',
          element: <Home />,
        },
        {
          path: '/book/:id',
          element: <BookDetail />,
        },
        {
          path: '/checkout',
          element: <Checkout />,
        },
        {
          path: '*',
          element: <Navigate to='/' replace />,
        },
      ]),
    []
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
