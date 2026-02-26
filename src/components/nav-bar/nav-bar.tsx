import './nav-bar.scss';
import { SearchWithSuggestions } from './search-with-suggestions';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '@/modules/cart';
import { BookOpen, MapPinCheck } from 'lucide-react';

export const NavBar = () => {
  const { items } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    // Sincronizar el input con los parámetros de búsqueda de la URL
    const queryParam = searchParams.get('q') || '';
    setSearchTerm(queryParam);
  }, [searchParams]);

  const options: { id: number; icon: string; tooltipText: string }[] = [
    {
      id: 1,
      icon: 'fa-heart',
      tooltipText: 'Mis listas',
    },
    {
      id: 2,
      icon: 'fa-question',
      tooltipText: 'Ayuda',
    },
    {
      id: 3,
      icon: 'fa-star',
      tooltipText: 'Opiniones de clientes',
    },
  ];

  const goToCart = () => {
    navigate('/cart');
  };

  const goToHome = () => {
    navigate('/books');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/books');
    }
  };

  return (
    <div className='nav-bar__container__content'>
      <div className='nav-bar__container__content__information'>
        <div
          className='nav-bar__container__content__information__site-name'
          onClick={() => {
            goToHome();
          }}
        >
          <BookOpen />
          <span>Relatos de papel</span>
        </div>
        <div className='nav-bar__container__content__information__site-direction'>
          <MapPinCheck />
          <div className='nav-bar__container__content__information__site-direction__text'>
            <span>ingresa tu</span>
            <span>direccion</span>
          </div>
        </div>
        <div className='nav-bar__container__content__information__search'>
          <SearchWithSuggestions
            value={searchTerm}
            onChange={setSearchTerm}
            onSearch={handleSearch}
          />
        </div>
      </div>
      <div className='nav-bar__container__content__options'>
        <div
          className=' nav-bar-icon nav-bar__container__content__options__car'
          onClick={() => {
            goToCart();
          }}
        >
          {items.length > 0 && (
            <div className='nav-bar__container__content__options__car__items'>
              {items.length}
            </div>
          )}
          <i className='fa-solid fa-cart-shopping'></i>
        </div>
        <div className='nav-bar__container__content__options__actions'>
          <TooltipProvider>
            {options.map(item => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <i className={`fa-solid ${item.icon}`}></i>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='nav-bar__container__content__options__actions__tooltip'>
                    {item.tooltipText}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
        <div className='nav-bar__container__content__options__personal'>
          <div className='nav-bar__container__content__options__personal__user'>
            <div className='nav-bar__container__content__options__personal__user__icon'>
              <i className='fa-solid fa-user'></i>
            </div>
            <span className='nav-bar__container__content__options__personal__user__text'>
              Mi Cuenta
            </span>
          </div>
          <div className='nav-bar__container__content__options__personal__language'>
            <i className='fa-solid fa-flag'></i>
          </div>
        </div>
      </div>
    </div>
  );
};
