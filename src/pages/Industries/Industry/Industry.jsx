import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchIndustry } from '../../../hooks/useFetchIndustry';

import styles from './Industry.module.scss';

const Industry = () => {
  const { id } = useParams();
  const { industry } = useFetchIndustry('industries', id);

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
          <h1>{industry.socialName}</h1>
          <p>{industry.fantasyName}</p>
          <p>{industry.cnpj}</p>
          <p>{industry.stateRegistration}</p>
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
