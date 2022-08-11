import { db } from '../firebase/config';

import { useState, useEffect } from 'react';

import { doc, getDoc } from 'firebase/firestore';

export const useFetchIndustry = (docCollection, id) => {
  const [industry, setIndustry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [canceled, setCanceled] = useState(false);

  useEffect(() => {
    async function loadIndustry() {
      if (canceled) return; // se cancelado, retorna
      setLoading(true); // inicializa o loading

      try {
        const industryRef = await doc(db, docCollection, id); // cria a referencia a ser passada no snap
        const industrySnap = await getDoc(industryRef);

        setIndustry(industrySnap.data());
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    loadIndustry();
  }, [docCollection, id, canceled]);

  useEffect(() => {
    return () => setCanceled(true);
  }, []); // define o cancelado como verdadeiro ao sair da pagina

  return { industry, loading, error };
};
