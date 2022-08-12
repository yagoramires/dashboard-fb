import { db } from '../firebase/config';

import { useState, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (canceled) return; // se cancelado, retorna
      setLoading(true); // inicializa o loading

      try {
        const documentRef = await doc(db, docCollection, id); // cria a referencia a ser passada no snap
        const documentSnap = await getDoc(documentRef);

        setDocument(documentSnap.data());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    loadDocument();
  }, [docCollection, id, canceled]);

  useEffect(() => {
    return () => setCanceled(true);
  }, []); // define o cancelado como verdadeiro ao sair da pagina

  return { document, loading, error };
};
