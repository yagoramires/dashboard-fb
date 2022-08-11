import { useNavigate, Link } from 'react-router-dom';

const ProductsTable = ({ products }) => {
  const navigate = useNavigate();

  return (
    <>
      {products && (
        <div>
          <button onClick={() => navigate('/products/new')} className='btn'>
            Cadastrar
          </button>
          <table className='table'>
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Indústria</th>
                <th style={{ width: '150px' }}>Código</th>
                <th>Produto</th>
                <th style={{ width: '150px' }}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ width: '150px' }}>{product.industry}</td>
                    <td style={{ width: '150px' }}>{product.productCode}</td>
                    <td>{product.productName}</td>
                    <td style={{ width: '150px' }}>
                      <Link to={`/products/${product.id}`}>Ver</Link>
                      <Link to={`/products/edit/${product.id}`}>Editar</Link>
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

export default ProductsTable;
