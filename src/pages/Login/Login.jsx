/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useState } from 'react';

// Hooks
import { useLogin } from '../../hooks/useLogin';

// Styles
import styles from './Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const { login, error: authError, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      email,
      password,
    }; // Objeto de usuário que será LOGADO no DB, utilizando as variáveis de estado.

    const res = await login(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]); // verifica se houve algum authError, atualizando o state de error para logar na tela caso tenha

  return (
    <div>
      <section className={styles.login}>
        <h2>Entrar</h2>
        <p>Entre para poder utilizar o sistema.</p>
        <form onSubmit={handleSubmit} className='form'>
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
          {!loading && <input type='submit' value='Entrar' className='btn' />}
          {loading && (
            <input type='submit' value='Entrando' className='btn' disabled />
          )}
          {error && <p className='error'>{error}</p>}
        </form>
      </section>
    </div>
  );
};

export default Login;
