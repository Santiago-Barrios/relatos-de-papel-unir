import { Input } from '@/components/ui/input';
import { useBookServices } from '@common/context/di-context';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './search-with-suggestions.scss';

const SUGGEST_DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

interface SearchWithSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchWithSuggestions = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Título, Autor, Descripción, Biografía y Categoría',
  className,
}: SearchWithSuggestionsProps) => {
  const bookService = useBookServices();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (!query || query.length < MIN_QUERY_LENGTH) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }
      setIsLoading(true);
      try {
        const results = await bookService.getSuggestions(query);
        setSuggestions(results);
        setIsOpen(results.length > 0);
      } catch {
        setSuggestions([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    },
    [bookService]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuggestions(value.trim());
    }, SUGGEST_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setIsOpen(false);
    setSuggestions([]);
    navigate(`/books?q=${encodeURIComponent(suggestion)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsOpen(false);
      onSearch();
    }
  };

  return (
    <div ref={containerRef} className={`search-with-suggestions ${className ?? ''}`}>
      <Input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setIsOpen(true)}
        style={{ height: '100%' }}
        autoComplete='off'
      />
      {isOpen && (
        <ul className='search-with-suggestions__dropdown' role='listbox'>
          {isLoading && (
            <li className='search-with-suggestions__item search-with-suggestions__item--loading'>
              Buscando...
            </li>
          )}
          {!isLoading &&
            suggestions.map((s, i) => (
              <li
                key={`${s}-${i}`}
                className='search-with-suggestions__item'
                role='option'
                onClick={() => handleSelectSuggestion(s)}
              >
                {s}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
