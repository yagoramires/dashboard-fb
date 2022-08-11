/* eslint-disable no-unused-vars */
import { db } from '../firebase/config'; // importa o DB do firebase

import { useState, useEffect, useReducer } from 'react';
import { updateDoc, doc } from 'firebase/firestore';

const initialState = {
  loading: null,
  error: null,
}; // Estado inicial do reducer

const updateReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true, error: null };
    case 'UPDATED_DOC':
      return { loading: false, error: null };
    case 'ERROR':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}; // Função do Reducer que valida os estados

export const useUpdateIndustry = (docCollection) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);
  //Reducer, passando a função que será executada e seu estado inicial setado acima

  // clean up, lida com o memory leak. ajuda na performance do app
  const [canceled, setCanceled] = useState(false);

  const checkCanceledBeforeDispatch = (action) => {
    if (!canceled) {
      dispatch(action);
    }
  }; // caso o estado cancelado seja falso, irá realizar o dispatch passando a action

  const updateIndustry = async (id, data) => {
    checkCanceledBeforeDispatch({
      type: 'LOADING',
    }); // Inicia o Loading no reducer

    try {
      const docRef = await doc(db, docCollection, id);
      const updatedDocument = await updateDoc(docRef, data);

      checkCanceledBeforeDispatch({
        type: 'UPDATED_DOC', // altera o estado para documento inserido
        payload: updatedDocument, // passa o documento a ser inserido
      });
    } catch (error) {
      checkCanceledBeforeDispatch({
        type: 'ERROR', // define o estado de erro, caso tenha
        payload: error.message, // passa o valor da mensagem do erro
      });
    }
  };

  useEffect(() => {
    return () => setCanceled(true);
  }, []); // define o cancelado como verdadeiro ao sair da pagina

  return { updateIndustry, response }; // retorna a funcao e a resposta do reducer
};
