import { useContext, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children, value }) => {
  // value é o valor de user recebido pelo auth, passado atraves do componente APP
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthValue() {
  return useContext(AuthContext);
}
