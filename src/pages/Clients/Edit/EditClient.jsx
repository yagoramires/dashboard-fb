import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useUpdateProduct } from '../../../hooks/useUpdateProduct';
import { useFetchProduct } from '../../../hooks/useFetchProduct';

import styles from './EditProduct.module.scss';
import { useEffect } from 'react';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchIndustries } from '../../../hooks/useFetchIndustries';

const EditProduct = () => {
  const { id } = useParams();
  const { product, loading } = useFetchProduct('products', id);

  const [industry, setIndustry] = useState('selecione');
  const [productImage, setProductImage] = useState('');
  const [productName, setProductName] = useState('');
  const [productModel, setProductModel] = useState('');
  const [productCode, setProductCode] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [error, setError] = useState('');

  const { industries } = useFetchIndustries('industries');

  useEffect(() => {
    if (product) {
      setIndustry(product.industry);
      setProductImage(product.productImage);
      setProductName(product.productName);
      setProductModel(product.productModel);
      setProductCode(product.productCode);
      setProductPrice(product.productPrice);
    }
  }, [product]);

  const { deleteDocument } = useDeleteDocument('products');

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDocument(id);
    navigate(`/products/`);
  };

  const { updateProduct, response } = useUpdateProduct('products');

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
      // !industry ||
      !productName ||
      !productModel ||
      !productCode ||
      !productPrice
    ) {
      setError('Por favor, preencha todos os campos!');
    }

    updateProduct(id, {
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

  if (loading) {
    return (
      <section>
        <p>Carregando ...</p>
      </section>
    );
  }

  return (
    <section className={styles.editProduct}>
      <div>
        <h1>Editar produto</h1>

        <p>Altere os dados abaixo</p>
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          {product && (
            <img src={product.productImage} alt={product.productName} />
          )}
        </label>
        <label>
          <span>Indústria:</span>
          <select
            onChange={(e) => setIndustry(e.target.value)}
            value={industry}
          >
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
          <span>URL da imagem do produto:</span>
          <input
            type='text'
            name='productImage'
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            placeholder='Digite o URL do produto'
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
          <input type='submit' value='Alterar' className='btn' />
        )}
        {response.loading && (
          <input type='submit' value='Alterando' className='btn' disabled />
        )}
        {response.error && <p className='error'>{response.error}</p>}
        {error && <p className='error'>{error}</p>}
      </form>

      <div className={styles.buttonsContainer}>
        <button onClick={() => navigate(`/products/${id}`)} className='btn '>
          Voltar
        </button>
        <button onClick={handleDelete} className='btn btn-danger'>
          Excluir
        </button>
      </div>
    </section>
  );
};

export default EditProduct;
