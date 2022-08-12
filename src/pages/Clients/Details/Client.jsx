import { useParams, useNavigate } from 'react-router-dom';

//Contexts
import { useFormat } from '../../../context/formatContext';

//Hooks
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchDocument } from '../../../hooks/useFetchDocument';

import styles from './Client.module.scss';

const Client = () => {
  const { id } = useParams();
  const { document: client } = useFetchDocument('clients', id);

  const { deleteDocument } = useDeleteDocument('clients');

  const navigate = useNavigate();
  const { formatCnpj } = useFormat();

  const handleDelete = () => {
    deleteDocument(id);
    navigate(`/clients/`);
  };

  return (
    <section className={styles.client}>
      {client && (
        <>
          <>
            <h3>Código</h3>
            <p>{client.code}</p>
          </>
          <div>
            <div>
              <h3>Razão Social</h3>
              <p>{client.socialName}</p>
            </div>

            {client.fantasyName && (
              <div>
                <h3>Nome Fantasia</h3>
                <p>{client.fantasyName}</p>
              </div>
            )}
          </div>

          <div>
            <div>
              <h3>CNPJ</h3>
              <p>{formatCnpj(client.cnpj)}</p>
            </div>

            {client.stateRegistration && (
              <div>
                <h3>Inscrição Estadual</h3>
                <p>{client.stateRegistration}</p>
              </div>
            )}
          </div>

          <div>
            {client.paymentTerm && (
              <div>
                <h3>Prazo de Pagamento</h3>
                <p>{client.paymentTerm}</p>
              </div>
            )}

            {client.shipping && (
              <div>
                <h3>Frete</h3>
                <p>{client.shipping}</p>
              </div>
            )}
          </div>

          <div>
            {client.addres && (
              <div>
                <h3>Endereço</h3>
                <p>{client.addres}</p>
              </div>
            )}
            {client.email && (
              <div>
                <h3>E-mail</h3>
                <p>{client.email}</p>
              </div>
            )}
          </div>

          <div>
            {client.network && (
              <div>
                <h3>Rede</h3>
                <p>{client.network}</p>
              </div>
            )}

            {client.invoicing && (
              <div>
                <h3>Tipo de Faturamento</h3>
                <p>{client.invoicing}</p>
              </div>
            )}
          </div>

          <div>
            {client.percent && (
              <div>
                <h3>Percentual</h3>
                <p>{client.percent}</p>
              </div>
            )}

            {client.descA && (
              <div>
                <h3>Descontos</h3>
                <div>
                  <p>{client.descA}</p>
                  <p>{client.descB}</p>
                  <p>{client.descC}</p>
                  <p>{client.descInCash}</p>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className='buttonsContainer'>
              <button onClick={() => navigate(`/clients/`)} className='btn'>
                Voltar
              </button>
              <button
                onClick={() => navigate(`/clients/edit/${id}`)}
                className='btn'
              >
                Editar
              </button>
              <button onClick={handleDelete} className='btn btn-danger'>
                Excluir
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Client;
