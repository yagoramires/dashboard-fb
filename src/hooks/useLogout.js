/* eslint-disable no-unused-vars */
import { db } from '../firebase/config'; // importa o DB do firebase

import {
  getAuth, // metodo de auth
  signOut, //realiza logout
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useLogout = () => {
  // clean up, lida com o memory leak. ajuda na performance do app
  const [canceled, setCanceled] = useState(false);

  const auth = getAuth(); // permite utilizar funcoes de autenticacao

  const checkCanceled = () => {
    if (canceled) {
      return;
    }
  }; // verifica se o canceled está true, caso esteja para a função

  const logout = () => {
    checkCanceled();
    signOut(auth);
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []); // define o cancelado como verdadeiro ao sair da pagina

  return { logout };
};
