import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchIndustries } from '../../../hooks/useFetchIndustries';
import { useInsertDocument } from '../../../hooks/useInsertDocument';

import styles from './RegisterProduct.module.scss';

const RegisterProduct = () => {
  const [industry, setIndustry] = useState('selecione');
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [productModel, setProductModel] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { industries } = useFetchIndustries('industries');

  const { insertDocument, response } = useInsertDocument('products');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (industry === 'selecione') {
      setError('Selecione uma indústria');
      return;
    }

    try {
      new URL(productImage);
    } catch (error) {
      setError('A imagem precisa ser um link.');
    }

    // check all values
    if (
      !industry ||
      !productModel ||
      !productName ||
      !productCode ||
      !productPrice
    ) {
      setError('Por favor, preencha todos os campos!');
    }

    insertDocument({
      industry,
      productImage,
      productName,
      productModel,
      productCode,
      productPrice,
    });

    if (response.error) return;

    navigate('/products');
  };

  return (
    <section className={styles.RegisterProduct}>
      <div>
        <span onClick={() => navigate('/products')}>Voltar</span>

        <h1>Cadastrar Produto</h1>

        <p>Preencha os dados abaixo para cadastrar novos produtos</p>
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          <span>Indústria:</span>
          <select onChange={(e) => setIndustry(e.target.value)}>
            <option value='select'>Selecione </option>
            {industries &&
              industries.map((industry) => (
                <option value={industry.fantasyName} key={industry.id}>
                  {industry.fantasyName}
                </option>
              ))}
          </select>
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type='text'
            name='productImage'
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder='Digite o URL da imagem do produto'
            required
          />
        </label>
        <label>
          <span>Nome do produto:</span>
          <input
            type='text'
            name='productName'
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder='Digite o nome do produto'
            required
          />
        </label>
        <label>
          <span>Código do produto:</span>
          <input
            type='number'
            name='productCode'
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder='Digite o código do produto'
            required
          />
        </label>
        <label>
          <span>Tipo do produto:</span>
          <input
            type='text'
            name='productModel'
            value={productModel}
            onChange={(e) => setProductModel(e.target.value)}
            placeholder='Digite o modelo/linha do produto'
            required
          />
        </label>
        <label>
          <span>Valor:</span>
          <input
            type='number'
            name='productPrice'
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder='Digite o valor do produto'
            required
          />
        </label>

        {!response.loading && (
          <input type='submit' value='Cadastrar' className='btn' />
        )}
        {response.loading && (
          <input type='submit' value='Cadastrando' className='btn' disabled />
        )}
        {response.error && <p className='error'>{response.error}</p>}
        {error && <p className='error'>{error}</p>}
      </form>
    </section>
  );
};

export default RegisterProduct;
