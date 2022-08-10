import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInsertIndustry } from '../../../hooks/useInsertIndustry';

import styles from './RegisterIndustry.module.scss';

const RegisterIndustry = () => {
  const [socialName, setSocialName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [stateRegistration, setStateRegistration] = useState('');
  const [addres, setAddress] = useState('');

  const navigate = useNavigate();

  const { insertIndustry, response } = useInsertIndustry('industries');

  const handleSubmit = (e) => {
    e.preventDefault();

    insertIndustry({
      socialName,
      fantasyName,
      cnpj,
      stateRegistration,
      addres,
    });

    if (response.error) return;

    navigate('/industries');
  };

  return (
    <section className={styles.registerIndustry}>
      <div>
        <span onClick={() => navigate('/industries')}>Voltar</span>

        <h1>Cadastrar Intustria</h1>

        <p>Preencha os dados abaixo para cadastrar novas industrias</p>
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          <span>Razão Social:</span>
          <input
            type='text'
            name='socialName'
            value={socialName}
            onChange={(e) => setSocialName(e.target.value)}
            placeholder='Escreva a razão social (Obrigatório)'
            required
          />
        </label>
        <label>
          <span>Nome fantasia:</span>
          <input
            type='text'
            name='fantasyName'
            value={fantasyName}
            onChange={(e) => setFantasyName(e.target.value)}
            placeholder='Escreva o nome fantasia (Obrigatório)'
            required
          />
        </label>
        <label>
          <span>CNPJ:</span>
          <input
            type='number'
            name='cnpj'
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            minLength={14}
            maxLength={14}
            placeholder='Escreva o CNPJ (Obrigatório)'
            required
          />
        </label>
        <label>
          <span>Inscrição Estadual:</span>
        </label>
        <input
          type='number'
          name='stateRegistration'
          value={stateRegistration}
          onChange={(e) => setStateRegistration(e.target.value)}
          placeholder='Escreva a Inscrição Estadual'
        />
        <label>
          <span>Endereço:</span>
          <input
            type='text'
            name='addres'
            value={addres}
            onChange={(e) => setAddress(e.target.value)}
            placeholder='Escreva o endereço'
          />
        </label>
        {!response.loading && (
          <input type='submit' value='Cadastrar' className='btn' />
        )}
        {response.loading && (
          <input type='submit' value='Cadastrando' className='btn' disabled />
        )}
        {response.error && <p className='error'>{response.error}</p>}
      </form>
    </section>
  );
};

export default RegisterIndustry;
