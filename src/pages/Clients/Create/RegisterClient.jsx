import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hooks
import { useInsertDocument } from '../../../hooks/useInsertDocument';

// Styles
import styles from './RegisterClient.module.scss';

const RegisterClient = () => {
  const [code, setCode] = useState('');
  const [socialName, setSocialName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [stateRegistration, setStateRegistration] = useState('');
  const [addres, setAddres] = useState('');
  const [shipping, setShipping] = useState('');
  const [network, setNetwork] = useState('');
  const [invoicing, setInvoicing] = useState('');
  const [paymentTerm, setPaymentTerm] = useState('');
  const [percent, setPercent] = useState('');
  const [descA, setDescA] = useState('');
  const [descB, setDescB] = useState('');
  const [descC, setDescC] = useState('');
  const [descInCash, setDescInCash] = useState('');

  const [error, setError] = useState('');

  const { insertDocument, response } = useInsertDocument('clients');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    //check all values
    if (!code || !socialName || !cnpj || !network || !invoicing) {
      setError('Por favor, preencha os campos obrigatórios!');
    }

    if (cnpj.length !== 14) {
      setError('O CNPJ precisa ser válido');
      return;
    }

    insertDocument({
      code,
      socialName,
      fantasyName,
      email,
      cnpj,
      stateRegistration,
      addres,
      shipping,
      network,
      invoicing,
      paymentTerm,
      percent,
      descA,
      descB,
      descC,
      descInCash,
    });

    if (response.error) return;

    navigate('/clients');
  };

  return (
    <section className={styles.RegisterClient}>
      <div>
        <span onClick={() => navigate('/clients')}>Voltar</span>
        <h1>Cadastrar Produto</h1>
        <p>Preencha os dados abaixo para cadastrar novos produtos</p>
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          <span>
            <span> * </span>Código do cliente:
          </span>
          <input
            type='number'
            name='code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder='Código '
            required
          />
        </label>

        <label>
          <span>
            <span> * </span>Razão Social:
          </span>
          <input
            type='text'
            name='socialName'
            value={socialName}
            onChange={(e) => setSocialName(e.target.value)}
            placeholder='Razão social '
            required
          />
        </label>
        <label>
          <span>Nome Fantasia:</span>
          <input
            type='text'
            name='fantasyName'
            value={fantasyName}
            onChange={(e) => setFantasyName(e.target.value)}
            placeholder='Nome fantasia'
            required
          />
        </label>

        <div>
          <label>
            <span>
              <span> * </span>CNPJ:
            </span>
            <input
              type='number'
              name='cnpj'
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder='CNPJ  '
            />
          </label>
          <label>
            <span>Inscrição Estadual:</span>
            <input
              type='number'
              name='stateRegistration'
              value={stateRegistration}
              onChange={(e) => setStateRegistration(e.target.value)}
              placeholder='Inscrição estadual'
            />
          </label>
        </div>
        <h3>Contato e entrega</h3>
        <div>
          <label>
            <span>E-mail:</span>
            <input
              type='email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='E-mail de contato'
            />
          </label>

          <label>
            <span>Endereço:</span>
            <input
              type='text'
              name='addres'
              value={addres}
              onChange={(e) => setAddres(e.target.value)}
              placeholder='Endereço'
            />
          </label>
          <label>
            <span>Frete:</span>
            <input
              type='text'
              name='shipping'
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
              placeholder='Tipo de frete'
            />
          </label>
        </div>

        <h3>Faturamento</h3>
        <div>
          <label>
            <span>
              <span> * </span>Rede:
            </span>
            <input
              type='text'
              name='network'
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              placeholder='Rede'
            />
          </label>
          <label>
            <span>
              <span> * </span>Tipo de Faturamento:
            </span>
            <input
              type='text'
              name='invoicing'
              value={invoicing}
              onChange={(e) => setInvoicing(e.target.value)}
              placeholder='Tipo de faturamento'
            />
          </label>
          <label>
            <span>Prazo de pagamento:</span>
            <input
              type='text'
              name='paymentTerm'
              value={paymentTerm}
              onChange={(e) => setPaymentTerm(e.target.value)}
              placeholder='Prazo de pagamento'
            />
          </label>
        </div>
        <h3>Descontos</h3>
        <div>
          <label>
            <span>Percentual:</span>
            <input
              type='number'
              name='percent'
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              placeholder='%'
            />
          </label>
          <label>
            <span>Desconto A:</span>
            <input
              type='number'
              name='descA'
              value={descA}
              onChange={(e) => setDescA(e.target.value)}
              placeholder='%'
            />
          </label>
          <label>
            <span>Desconto B:</span>
            <input
              type='number'
              name='descB'
              value={descB}
              onChange={(e) => setDescB(e.target.value)}
              placeholder='%'
            />
          </label>
          <label>
            <span>Desconto C:</span>
            <input
              type='number'
              name='descC'
              value={descC}
              onChange={(e) => setDescC(e.target.value)}
              placeholder='%'
            />
          </label>
          <label>
            <span>Desc. à vista:</span>
            <input
              type='number'
              name='descInCash'
              value={descInCash}
              onChange={(e) => setDescInCash(e.target.value)}
              placeholder='%'
            />
          </label>
        </div>

        {!response.loading && (
          <input type='submit' value='Cadastrar' className='btn' />
        )}
        {response.loading && (
          <input type='submit' value='Cadastrando' className='btn' disabled />
        )}
        {response.error && <p className='error'>{response.error}</p>}
        {error && <p className='error'>{error}</p>}
      </form>
    </section>
  );
};

export default RegisterClient;
