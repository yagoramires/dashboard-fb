import { useParams, useNavigate } from 'react-router-dom';
import { useDeleteDocument } from '../../../hooks/useDeleteDocument';
import { useFetchProduct } from '../../../hooks/useFetchProduct';

import styles from './Product.module.scss';

const Product = () => {
  const { id } = useParams();
  const { product } = useFetchProduct('products', id);

  const { deleteDocument } = useDeleteDocument('products');

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteDocument(id);
    navigate(`/products/`);
  };

  return (
    <section className={styles.product}>
      {product && (
        <>
          <img src={product.productImage} alt={product.productName} />

          <div>
            <h3>Código</h3>
            <p>{product.productCode}</p>
            <h3>Nome</h3>
            <p>{product.productName}</p>
            <h3>Linha</h3>
            <p>{product.productModel}</p>
            <h3>Preço unitário</h3>
            <p>
              {Number(product.productPrice).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>

            <div>
              <button onClick={() => navigate(`/products/`)} className='btn'>
                Voltar
              </button>
              <button
                onClick={() => navigate(`/products/edit/${id}`)}
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

export default Product;
