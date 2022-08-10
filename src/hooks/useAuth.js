/* eslint-disable no-unused-vars */
import { db } from '../firebase/config'; // importa o DB do firebase

import {
  getAuth, // metodo de auth
  createUserWithEmailAndPassword, // cria usuario com email e senha
  updateProfile, // atualiza o perfil
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuth = () => {
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

  const createUser = async (userData) => {
    checkCanceled(); // chama a funcao e verifica se está cancelado
    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        // funcao para criar usuario no firebase
        auth, // necessário passar a autenticacao
        userData.email, // email recebido do form
        userData.password, // senha recebida do form
      );

      await updateProfile(user, {
        displayName: userData.displayName,
      }); // atualiza o perfil com o objeto user criado acima + o display name recebido de userData (form)

      setLoading(false);
      return user; // retorna o user
    } catch (error) {
      console.log(error.message);

      let systemErrorMessage; // define uma variavel de erro para lidar com os erros em ingles

      if (error.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.';
      } else if (error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.';
      }
      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []); // define o cancelado como verdadeiro ao sair da pagina

  return { auth, createUser, error, loading };
};
