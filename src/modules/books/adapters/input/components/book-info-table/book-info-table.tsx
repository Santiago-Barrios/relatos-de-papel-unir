import { Card, CardContent } from '@/components/ui/card';
import type { BookModel } from '@/modules/books/domain/book.model';

interface BookInfoTableProps {
  book: BookModel;
  className?: string;
}

export const BookInfoTable = ({ book, className = '' }: BookInfoTableProps) => {
  const infoItems = [
    { label: 'Formato', value: 'Libro Físico' },
    { label: 'Autor', value: book.author },
    { label: 'Editorial', value: book.editorial || 'N/A' },
    { label: 'Año', value: book.year?.toString() || 'N/A' },
    { label: 'Idioma', value: book.language || 'N/A' },
    { label: 'Nº páginas', value: book.pages?.toString() || 'N/A' },
    { label: 'Nº edición', value: book.edition?.toString() || 'N/A' },
    {
      label: 'Categorías',
      value: book.categories?.join(', ') || 'N/A',
    },
  ];

  return (
    <Card className={`book-info-table ${className}`.trim()}>
      <CardContent className='book-info-table__content'>
        <table className='book-info-table__table'>
          <tbody>
            {infoItems.map((item, index) => (
              <tr key={index} className='book-info-table__row'>
                <td className='book-info-table__label'>{item.label}:</td>
                <td className='book-info-table__value'>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
