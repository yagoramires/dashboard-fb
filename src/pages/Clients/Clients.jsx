import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// Components
import ClientsTable from '../../components/ClientsTable/ClientsTable';

// Styles
import styles from './Clients.module.scss';

const Clients = () => {
  const [query, setQuery] = useState();
  const [searchResult, setSearchResult] = useState('');

  const { documents: clients, loading } = useFetchDocuments('clients');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResult('');

    if (query) {
      const searchName = clients.filter((client) =>
        client.socialName.toLowerCase().includes(query.toLowerCase()),
      );
      const searchCode = clients.filter((client) =>
        client.code.toLowerCase().includes(query.toLowerCase()),
      );
      const searchCnpj = clients.filter((client) =>
        client.cnpj.includes(query),
      );

      if (searchName.length > 0) {
        setSearchResult(searchName);
      } else if (searchCode.length > 0) {
        setSearchResult(searchCode);
      } else if (searchCnpj.length > 0) {
        setSearchResult(searchCnpj);
      }
    }
    setQuery('');
  };

  if (loading)
    return (
      <section>
        <p>Carregando ...</p>
      </section>
    );

  return (
    <section className={styles.clients}>
      <h1>Clientes</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Pesquise por clientes'
        />
        <input type='submit' value='Buscar' className='btn' />
      </form>

      {!clients && (
        <div className='nopost'>
          <p>Nenhum cliente cadatrado.</p>
          <button onClick={() => navigate('/clients/new')} className='btn'>
            Cadastrar
          </button>
        </div>
      )}

      {searchResult && searchResult.length > 0 && (
        <>
          <p onClick={() => setSearchResult('')} className='cleanSearch'>
            Limpar Busca
          </p>
          <ClientsTable clients={searchResult} />
        </>
      )}

      {searchResult && searchResult.length === 0 && (
        <>
          <p onClick={() => setSearchResult('')}>Limpar Busca</p>
          <p>Nenhum resultado encontrado</p>
        </>
      )}

      {clients && !searchResult && (
        <>
          <ClientsTable clients={clients} />
        </>
      )}
    </section>
  );
};

export default Clients;
