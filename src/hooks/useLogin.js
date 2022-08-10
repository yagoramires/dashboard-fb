/* eslint-disable no-unused-vars */
import { db } from '../firebase/config'; // importa o DB do firebase

import {
  getAuth, // metodo de auth
  signInWithEmailAndPassword, // loga com email e senha
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // clean up, lida com o memory leak. ajuda na performance do app
  const [canceled, setCanceled] = useState(false);

  const auth = getAuth(); // permite utilizar funcoes de autenticacao

  const checkCanceled = () => {
    if (canceled) {
      return;
    }
  }; // verifica se o canceled está true, caso esteja para a função

  const login = async (userData) => {
    checkCanceled();

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes('user-not-found')) {
        systemErrorMessage = 'Usuário não encontrado.';
      } else if (error.message.includes('wrong-password')) {
        systemErrorMessage = 'Senha incorreta.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, por favor tenta mais tarde.';
      }
      setError(systemErrorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []); // define o cancelado como verdadeiro ao sair da pagina

  return { login, error, loading };
};
