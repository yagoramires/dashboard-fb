import { useParams, useNavigate } from 'react-router-dom';

// Contexts
import { useFormat } from '../../../context/formatContext';

// Hooks
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchDocument } from '../../../hooks/useFetchDocument';

// Styles
import styles from './Industry.module.scss';

const Industry = () => {
  const { id } = useParams();
  const { document: industry } = useFetchDocument('industries', id);
  const { deleteDocument } = useDeleteDocument('industries');

  const { formatCnpj } = useFormat();

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
