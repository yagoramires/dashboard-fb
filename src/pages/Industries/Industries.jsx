import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchIndustries } from '../../hooks/useFetchIndustries';

import IndustryTable from '../../components/IndustryTable/IndustryTable';

import styles from './Industries.module.scss';

const Industries = () => {
  const [query, setQuery] = useState();
  const [searchResult, setSearchResult] = useState('');

  const navigate = useNavigate();

  const { industries, loading } = useFetchIndustries('industries');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResult('');

    if (query) {
      const searchFantasy = industries.filter((industry) =>
        industry.fantasyName.toLowerCase().includes(query.toLowerCase()),
      );
      const searchSocial = industries.filter((industry) =>
        industry.socialName.toLowerCase().includes(query.toLowerCase()),
      );
      const searchCnpj = industries.filter((industry) =>
        industry.cnpj.includes(
          query.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, ''),
        ),
      );

      if (searchFantasy.length > 0) {
        setSearchResult(searchFantasy);
      } else if (searchSocial.length > 0) {
        setSearchResult(searchSocial);
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
    <section className={styles.industries}>
      <h1>Indústrias</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Pesquise por indústrias'
        />
        <input type='submit' value='Buscar' className='btn' />
      </form>

      {!industries && (
        <div className='nopost'>
          <p>Nenhuma indústria cadatrada.</p>
          <button onClick={() => navigate('/industries/new')} className='btn'>
            Cadastrar
          </button>
        </div>
      )}

      {searchResult && searchResult.length > 0 && (
        <>
          <p onClick={() => setSearchResult('')}>Limpar Busca</p>
          <IndustryTable industries={searchResult} />
        </>
      )}

      {searchResult && searchResult.length === 0 && (
        <>
          <p onClick={() => setSearchResult('')}>Limpar Busca</p>
          <p>Nenhum resultado encontrado</p>
        </>
      )}

      {industries && !searchResult && (
        <>
          <IndustryTable industries={industries} />
        </>
      )}
    </section>
  );
};

export default Industries;
