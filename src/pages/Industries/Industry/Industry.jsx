import { useParams, useNavigate } from 'react-router-dom';
import { useFormat } from '../../../context/formatContext';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchIndustry } from '../../../hooks/useFetchIndustry';

import styles from './Industry.module.scss';

const Industry = () => {
  const { id } = useParams();
  const { industry } = useFetchIndustry('industries', id);

  const { formatCnpj } = useFormat();

  const { deleteDocument } = useDeleteDocument('industries');

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDocument(id);
    navigate(`/industries/`);
  };

  return (
    <section className={styles.industry}>
      {industry && (
        <>
          <h3>Razão Social</h3>
          <p>{industry.socialName}</p>
          <h3>Nome fantasia</h3>
          <p>{industry.fantasyName}</p>
          <h3>CNPJ</h3>
          <p>{formatCnpj(industry.cnpj)}</p>
          <h3>Inscrição Estadual</h3>
          <p>{industry.stateRegistration}</p>
          <h3>Endereço</h3>
          <p>{industry.addres}</p>

          <div>
            <button
              onClick={() => navigate(`/industries/edit/${id}`)}
              className='btn'
            >
              Editar
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

export default Industry;
