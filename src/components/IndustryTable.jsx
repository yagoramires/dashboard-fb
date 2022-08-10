import { useNavigate, Link } from 'react-router-dom';

const IndustryTable = ({industries}) => {

  const navigate = useNavigate();

  const cnpjEdit = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length <= 11) {
      cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/(\d{3})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
      cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    }

    return cnpj;
  };

  return (
    <>
  
    {industries && (
        <div>
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
                    <td>{cnpjEdit(industry.cnpj)}</td>
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
  )
}

export default IndustryTable