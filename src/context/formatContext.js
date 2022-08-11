import { useContext, createContext } from 'react';

const formatContext = createContext();

export const FormatProvider = ({ children }) => {
  const formatCnpj = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length <= 11) {
      cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
      cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    }

    return cnpj;
  };

  return (
    <formatContext.Provider value={{ formatCnpj }}>
      {children}
    </formatContext.Provider>
  );
};

export function useFormat() {
  return useContext(formatContext);
}
