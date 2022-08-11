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
                <th>Código</th>
                <th>Produto</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product.id}>
                    <td style={{ maxWidth: '100px' }}>{product.productCode}</td>
                    <td>{product.productName}</td>
                    <td>
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
