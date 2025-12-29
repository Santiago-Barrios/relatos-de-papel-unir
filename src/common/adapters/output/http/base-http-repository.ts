import { envManager } from '@common/utils/env-manager';

/**
 * Clase base abstracta para repositorios HTTP
 * Proporciona funcionalidad común para realizar peticiones HTTP
 */
export abstract class BaseHttpRepository<T> {
  protected readonly baseUrl: string;

  constructor() {
    this.baseUrl = envManager.get('API_URL') || 'http://localhost:3000/api';
  }

  /**
   * Realiza una petición GET
   */
  protected async get<R = T>(endpoint: string): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Realiza una petición POST
   */
  protected async post<R = T>(endpoint: string, body?: unknown): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to post: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Realiza una petición PUT
   */
  protected async put<R = T>(endpoint: string, body?: unknown): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to put: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Realiza una petición PATCH
   */
  protected async patch<R = T>(endpoint: string, body?: unknown): Promise<R> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Failed to patch: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Realiza una petición DELETE
   */
  protected async delete(endpoint: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete: ${response.statusText}`);
    }
  }
}
