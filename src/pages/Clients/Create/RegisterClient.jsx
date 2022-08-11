import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInsertDocument } from '../../../hooks/useInsertDocument';

import styles from './RegisterClient.module.scss';

const RegisterClient = () => {
  const [productName, setProductName] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { insertDocument, response } = useInsertDocument('clients');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // check all values
    if (!productName) {
      setError('Por favor, preencha todos os campos!');
    }

    insertDocument({
      productName,
    });

    if (response.error) return;

    navigate('/products');
  };

  return (
    <section className={styles.RegisterClient}>
      <div>
        <span onClick={() => navigate('/products')}>Voltar</span>

        <h1>Cadastrar Produto</h1>

        <p>Preencha os dados abaixo para cadastrar novos produtos</p>
      </div>
      <form onSubmit={handleSubmit} className='form'>
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

export default RegisterClient;
