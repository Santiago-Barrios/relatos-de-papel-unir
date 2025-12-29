import { useQuery } from '@tanstack/react-query';
import './side-menu.scss';
import { useCategoryServices } from '@/common/context/di-context';

export const SideMenu = () => {
  const categoriesService = useCategoryServices();

  const {
    data: categories,
    isLoading: loadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesService.getCategories(),
  });
  return (
    <div className='side-menu'>
      <div className='side-menu__container'>
        <span className='side-menu__container__title'>Categorias</span>

        <div className='side-menu__container__categories'>
          {categories?.map(category => (
            <span
              className='side-menu__container__categories__category'
              key={category.id}
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
