import { useNavigate, Link } from 'react-router-dom';
import { useFormat } from '../../context/formatContext';

const IndustryTable = ({ industries }) => {
  const navigate = useNavigate();

  const { formatCnpj } = useFormat();

  return (
    <>
      {industries && (
        <div>
          <button onClick={() => navigate('/industries/new')} className='btn'>
            Cadastrar
          </button>
          <table className='table'>
            <thead>
              <tr>
                <th>Razão Social</th>
                <th>CNPJ</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {industries &&
                industries.map((industry) => (
                  <tr key={industry.id}>
                    <td>{industry.fantasyName}</td>
                    <td>{formatCnpj(industry.cnpj)}</td>
                    <td>
                      <Link to={`/industries/${industry.id}`}>Ver</Link>
                      <Link to={`/industries/edit/${industry.id}`}>Editar</Link>
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

export default IndustryTable;
