import { useNavigate, useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';
import './active-filter-chips.scss';

const PRICE_LABELS: Record<string, string> = {
  '0-20': 'Hasta $20',
  '0-20.01': 'Hasta $20',
  '20.01-50': '$20-$50',
  '50-100': '$50-$100',
  '100-500': '$100-$500',
};

function getPriceLabel(min?: string, max?: string): string {
  if (!min && !max) return '';
  const key = `${min ?? '0'}-${max ?? '500'}`;
  return PRICE_LABELS[key] ?? `$${min ?? '0'} - $${max ?? '500'}`;
}

export const ActiveFilterChips = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const q = searchParams.get('q');
  const category = searchParams.get('category');
  const author = searchParams.get('author');
  const priceMin = searchParams.get('priceMin');
  const priceMax = searchParams.get('priceMax');

  const filters: { key: string; label: string; paramKeys: string[] }[] = [];

  if (q?.trim()) {
    filters.push({
      key: 'q',
      label: `Búsqueda: "${q}"`,
      paramKeys: ['q'],
    });
  }
  if (category) {
    filters.push({
      key: 'category',
      label: `Categoría: ${category}`,
      paramKeys: ['category'],
    });
  }
  if (author) {
    filters.push({
      key: 'author',
      label: `Autor: ${author}`,
      paramKeys: ['author'],
    });
  }
  if (priceMin || priceMax) {
    filters.push({
      key: 'price',
      label: `Precio: ${getPriceLabel(priceMin ?? undefined, priceMax ?? undefined)}`,
      paramKeys: ['priceMin', 'priceMax'],
    });
  }

  const removeFilter = (paramKeys: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    paramKeys.forEach(k => newParams.delete(k));
    const query = newParams.toString();
    navigate(`/books${query ? `?${query}` : ''}`);
  };

  if (filters.length === 0) return null;

  return (
    <div className='active-filter-chips'>
      <span className='active-filter-chips__label'>Filtros activos:</span>
      <div className='active-filter-chips__list'>
        {filters.map(({ key, label, paramKeys }) => (
          <button
            type='button'
            key={key}
            className='active-filter-chips__chip'
            onClick={() => removeFilter(paramKeys)}
          >
            <span className='active-filter-chips__chip__label'>{label}</span>
            <X className='active-filter-chips__chip__icon' size={14} />
          </button>
        ))}
      </div>
    </div>
  );
};
