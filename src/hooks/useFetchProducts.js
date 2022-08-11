import { db } from '../firebase/config';

import { useState, useEffect } from 'react';

import {
  collection, // define a colecao
  query, // buscar o dado
  orderBy, // ordena os dados
  onSnapshot, // mapeia os dados, sempre que ha uma alteracao nos dados ele atualiza
  // where, // faz um filtro dos dados
} from 'firebase/firestore';

export const useFetchProducts = (docCollection) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      if (canceled) return; // se cancelado, retorna

      setLoading(true); // inicializa o loading

      const collectionRef = await collection(db, docCollection); // define a colecao que será utilizada

      try {
        let q;

        q = await query(collectionRef, orderBy('createdAt'));

        await onSnapshot(q, (querySnapshot) => {
          // faz o mapeamento dos dados, ou seja atualiza quando ha alteracoes
          setProducts(
            querySnapshot.docs.map((doc) => ({
              id: doc.id, // traz o id
              ...doc.data(), // traz os dados inseridos no banco
            })), // define os doc com o objeto mapeado
          );
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    loadProducts();
  }, [docCollection, canceled]);

  useEffect(() => {
    return () => setCanceled(true);
  }, []); // define o cancelado como verdadeiro ao sair da pagina

  return { products, loading, error };
};
