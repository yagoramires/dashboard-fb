import { db } from '../firebase/config';

import { useState, useEffect } from 'react';

import {
  collection, // define a colecao
  query, // buscar o dado
  orderBy, // ordena os dados
  onSnapshot,
  where, // faz um filtro dos dados
} from 'firebase/firestore';

export const useFetchIndustries = (docCollection, search = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
};
