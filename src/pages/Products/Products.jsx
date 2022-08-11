import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchProducts } from '../../hooks/useFetchProducts';

import ProductsTable from '../../components/ProductsTable/ProductsTable';

import styles from './Products.module.scss';

const Products = () => {
  const [query, setQuery] = useState();
  const [searchResult, setSearchResult] = useState('');

  const navigate = useNavigate();

  const { products, loading } = useFetchProducts('products');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResult('');

    if (query) {
      const searchName = products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase()),
      );
      const searchCode = products.filter((product) =>
        product.productCode.toLowerCase().includes(query.toLowerCase()),
      );
      const searchModel = products.filter((product) =>
        product.productModel.toLowerCase().includes(query.toLowerCase()),
      );

      if (searchName.length > 0) {
        setSearchResult(searchName);
      } else if (searchCode.length > 0) {
        setSearchResult(searchCode);
      } else if (searchModel.length > 0) {
        setSearchResult(searchModel);
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
    <section className={styles.products}>
      <h1>Produtos</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Pesquise por produtos'
        />
        <input type='submit' value='Buscar' className='btn' />
      </form>

      {!products && (
        <div className='nopost'>
          <p>Nenhuma indústria cadatrada.</p>
          <button onClick={() => navigate('/products/new')} className='btn'>
            Cadastrar
          </button>
        </div>
      )}

      {searchResult && searchResult.length > 0 && (
        <>
          <p onClick={() => setSearchResult('')} className='cleanSearch'>
            Limpar Busca
          </p>
          <ProductsTable products={searchResult} />
        </>
      )}

      {searchResult && searchResult.length === 0 && (
        <>
          <p onClick={() => setSearchResult('')} className='cleanSearch'>
            Limpar Busca
          </p>
          <p>Nenhum resultado encontrado</p>
        </>
      )}

      {products && !searchResult && (
        <>
          <ProductsTable products={products} />
        </>
      )}
    </section>
  );
};

export default Products;
