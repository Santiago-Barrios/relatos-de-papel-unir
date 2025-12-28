/**
 * Manager para obtener variables de entorno
 */
export const envManager = {
  get(key: string): string | undefined {
    // En Vite, las variables de entorno deben empezar con VITE_
    if (key === "ENV") {
      // Si hay VITE_ENVIRONMENT configurado, usarlo; si no, usar MODE (que viene del --mode de vite)
      return import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE;
    }
    return import.meta.env[`VITE_${key}`] as string | undefined;
  },
};
