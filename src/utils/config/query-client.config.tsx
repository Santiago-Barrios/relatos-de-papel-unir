import { QueryClient } from '@tanstack/react-query';

/**
 * Configuración del QueryClient para TanStack Query.
 *
 * Configuración optimizada para:
 *
 * - Cache eficiente de datos
 * - Refetch inteligente
 * - Manejo de errores
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tiempo por defecto que los datos se consideran frescos
      staleTime: 300000, // 5 minutos - evita consultas innecesarias al navegar entre secciones
      // Tiempo que los datos se mantienen en cache cuando no hay observadores
      gcTime: 600000, // 10 minutos (antes cacheTime)
      // No refetch automático al enfocar la ventana
      refetchOnWindowFocus: false,
      // No refetch automático al reconectar
      refetchOnReconnect: false,
      // No refetch automático al montar si los datos están frescos
      refetchOnMount: false,
      // Reintentos en caso de error
      retry: 1,
      // Tiempo entre reintentos
      retryDelay: 1000,
    },
  },
});
