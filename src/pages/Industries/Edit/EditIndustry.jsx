import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useFetchIndustry } from '../../../hooks/useFetchIndustry';

import styles from './EditIndustry.module.scss';
import { useEffect } from 'react';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useUpdateDocument } from '../../../hooks/useUpdateDocument';

const EditIndustry = () => {
  const { id } = useParams();
  const { industry, loading } = useFetchIndustry('industries', id);

  const [socialName, setSocialName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [stateRegistration, setStateRegistration] = useState('');
  const [addres, setAddress] = useState('');

  useEffect(() => {
    if (industry) {
      setSocialName(industry.socialName);
      setFantasyName(industry.fantasyName);
      setCnpj(industry.cnpj);
      setStateRegistration(industry.stateRegistration);
      setAddress(industry.addres);
    }
  }, [industry]);

  const { deleteDocument } = useDeleteDocument('industries');

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDocument(id);
    navigate(`/industries/`);
  };

  const { updateDocument, response } = useUpdateDocument('industries');

  const handleSubmit = (e) => {
    e.preventDefault();

    updateDocument(id, {
      socialName,
      fantasyName,
      cnpj,
      stateRegistration,
      addres,
    });

    if (response.error) return;

    navigate('/industries');
  };

  if (loading) {
    return (
      <section>
        <p>Carregando ...</p>
      </section>
    );
  }

  return (
    <section className={styles.EditIndustry}>
      {industry && (
        <>
          <div>
            <h1>Alterar {industry.fantasyName}</h1>

            <p>Altere as informações como desejar</p>
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
              <input type='submit' value='Atualizar' className='btn' />
            )}
            {response.loading && (
              <input
                type='submit'
                value='Cadastrando'
                className='btn'
                disabled
              />
            )}
            {response.error && <p className='error'>{response.error}</p>}
          </form>

          <div className={styles.buttonsContainer}>
            <button onClick={() => navigate('/industries')} className='btn '>
              Voltar
            </button>
            <button onClick={handleDelete} className='btn btn-danger'>
              Excluir
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default EditIndustry;
