export interface SearchFilters {
  q?: string;
  title?: string;
  author?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  isVisible?: boolean;
  aggregate?: boolean;
  page?: number;
  size?: number;
}