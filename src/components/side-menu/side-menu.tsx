import { useNavigate } from 'react-router-dom';
import './side-menu.scss';
import type { AggregationDetails } from '@modules/books/domain/aggregation.model';

const FACET_LABELS: Record<string, string> = {
  category: 'Categorías',
  author: 'Autores',
  price_range: 'Precio',
};

interface SideMenuProps {
  aggregations: Record<string, AggregationDetails[]>;
}

export const SideMenu = ({ aggregations }: SideMenuProps) => {
  const navigate = useNavigate();
  const basePath = '/books';

  const handleFacetClick = (uri?: string) => {
    if (!uri) return;
    const searchPart = uri.startsWith('?') ? uri : `?${uri}`;
    navigate(`${basePath}${searchPart}`);
  };

  const facetOrder = ['category', 'author', 'price_range'];
  const hasAnyAggregations = facetOrder.some(key => (aggregations[key]?.length ?? 0) > 0);

  return (
    <div className='side-menu'>
      <div className='side-menu__container'>
        {!hasAnyAggregations && (
          <p className='side-menu__container__empty'>Realiza una búsqueda para ver filtros</p>
        )}
        {facetOrder.map(
          facetKey =>
            aggregations[facetKey]?.length > 0 && (
              <div key={facetKey} className='side-menu__container__facet'>
                <span className='side-menu__container__facet__title'>
                  {FACET_LABELS[facetKey] ?? facetKey}
                </span>
                <div className='side-menu__container__facet__options'>
                  {aggregations[facetKey].map((opt, idx) => (
                    <button
                      type='button'
                      className='side-menu__container__facet__option'
                      key={opt.key + String(idx)}
                      onClick={() => handleFacetClick(opt.uri)}
                    >
                      <span className='side-menu__container__facet__option__label'>{opt.key}</span>
                      <span className='side-menu__container__facet__option__count'>({opt.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
