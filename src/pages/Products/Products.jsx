import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

// Components
import ProductsTable from '../../components/ProductsTable/ProductsTable';

// Styles
import styles from './Products.module.scss';

const Products = () => {
  const [query, setQuery] = useState();
  const [searchResult, setSearchResult] = useState('');
  const [industry, setIndustry] = useState('ILUMI');
  const [productsIndustry, setProductsIndustry] = useState([]);

  const { documents: products, loading } = useFetchDocuments('products');
  const { documents: industries } = useFetchDocuments('industries');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchResult('');

    if (query) {
      const searchName = products.filter((product) =>
        product.productName.toLowerCase().includes(query.toLowerCase()),
      );
      const searchCode = products.filter((product) =>
        product.productCode.includes(query),
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

  useEffect(() => {
    if (products) {
      const filteredProducts = products.filter(
        (product) => product.industry.toLowerCase() === industry.toLowerCase(),
      );
      setProductsIndustry(filteredProducts);
    }
  }, [products, industry]);

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

      {industries && (
        <div className='industriesBtn'>
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setIndustry(industry.fantasyName)}
            >
              {industry.fantasyName}
            </button>
          ))}
        </div>
      )}

      {productsIndustry && productsIndustry.length === 0 && (
        <div className='nopost' style={{ marginTop: '4rem' }}>
          <p>Nenhum produto cadatrado.</p>
          <button onClick={() => navigate('/products/new')} className='btn'>
            Cadastrar
          </button>
        </div>
      )}

      {searchResult && searchResult.length > 0 && (
        <>
          <p onClick={() => setSearchResult('')}>Limpar Busca</p>
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

      {productsIndustry && productsIndustry.length > 0 && !searchResult && (
        <>
          <ProductsTable products={productsIndustry} />
        </>
      )}
    </section>
  );
};

export default Products;
