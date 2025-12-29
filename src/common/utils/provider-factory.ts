/**
 * Factory para crear providers basados en el entorno
 */
export const EnvironmentEnum = {
  Mocked: 'mocked',
  Local: 'localdev',
  Development: 'development',
  Production: 'production',
} as const;

export type EnvironmentType =
  (typeof EnvironmentEnum)[keyof typeof EnvironmentEnum];

import { envManager } from './env-manager';

export function providerFactory<T>(providers: Record<string, T>): T {
  // Por defecto usar Mocked si no hay variable de entorno configurada
  const currentEnv = envManager.get('ENV') || EnvironmentEnum.Mocked;

  // Normalizar el entorno a minúsculas para comparación
  const normalizedEnv = currentEnv.toLowerCase();

  // Buscar el provider que coincida con el entorno actual
  const providerKey =
    Object.keys(providers).find(key => key.toLowerCase() === normalizedEnv) ||
    EnvironmentEnum.Mocked;

  const provider = providers[providerKey];

  if (!provider) {
    throw new Error(`No provider found for environment: ${currentEnv}`);
  }

  return provider;
}
