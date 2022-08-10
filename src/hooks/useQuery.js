import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export function useQuery() {
  const { search } = useLocation(); // traz os parametros da URL

  return useMemo(() => new URLSearchParams(search), [search]); // traz o parametro da busca e o memo é executado ao alterar o search
}
