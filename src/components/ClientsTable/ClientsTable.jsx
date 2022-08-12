import { useNavigate, Link } from 'react-router-dom';

import { useFormat } from '../../context/formatContext';

const ClientsTable = ({ clients }) => {
  const navigate = useNavigate();

  const { formatCnpj } = useFormat();

  return (
    <>
      {clients && (
        <div>
          <button onClick={() => navigate('/clients/new')} className='btn'>
            Cadastrar
          </button>
          <table className='table'>
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Código</th>
                <th>Razão Social</th>
                <th style={{ width: '200px' }}>CNPJ</th>
                <th style={{ width: '150px' }}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {clients &&
                clients.map((client) => (
                  <tr key={client.id}>
                    <td style={{ width: '150px' }}>{client.code}</td>
                    <td>{client.socialName}</td>
                    <td style={{ width: '200px' }}>
                      {formatCnpj(client.cnpj)}
                    </td>
                    <td style={{ width: '150px' }}>
                      <Link to={`/clients/${client.id}`}>Ver</Link>
                      <Link to={`/clients/edit/${client.id}`}>Editar</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default ClientsTable;
