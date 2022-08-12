/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

// Hooks
import { useAuth } from '../../hooks/useAuth';

// styles
import styles from './RegisterUser.module.scss';

const RegisterUser = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');

  const { createUser, error: authError, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      displayName,
      email,
      password,
    }; // Objeto de usuário que será cadastrado no DB, utilizando as variáveis de estado.

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais!');
      return;
    } // Valida se as senhas são iguais

    const res = await createUser(user); // chama a funcao assincrona create user e passa o objeto user como parametro
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]); // verifica se houve algum authError, atualizando o state de error para logar na tela caso tenha

  return (
    <section className={styles.register}>
      <h2>Cadastre-se</h2>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          <span>Nome:</span>
          <input
            required
            type='text'
            name='displayName'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='Digite seu nome'
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            required
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Digite seu email'
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            required
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Digite sua senha'
          />
        </label>
        <label>
          <span>Confirmação de senha:</span>
          <input
            required
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirme sua senha'
          />
        </label>
        {!loading && <input type='submit' value='Cadastrar' className='btn' />}
        {loading && (
          <input type='submit' value='Cadastrando' className='btn' disabled />
        )}
        {error && <p className='error'>{error}</p>}
      </form>
    </section>
  );
};

export default RegisterUser;
