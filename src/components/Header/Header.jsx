import { NavLink, Link } from 'react-router-dom';

import { useLogout } from '../../hooks/useLogout';

import { useAuthValue } from '../../context/AuthContext';

// styles
import styles from './Header.module.scss';

const Header = () => {
  const { user } = useAuthValue();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        Dashboard
      </Link>
      <ul className={styles.nav}>
        {user && (
          <>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='/orders'>Pedidos</NavLink>
            </li>
            <li>
              <NavLink to='/products'>Produtos</NavLink>
            </li>
            <li>
              <NavLink to='/clients'>Clientes</NavLink>
            </li>
            <li>
              <NavLink to='/industries'>Indústrias</NavLink>
            </li>
            {/* <li>
              <NavLink to='/register/industry'>Novo</NavLink>
            </li> */}
            <li>
              <span onClick={handleLogout} className={styles.logout}>
                Sair
              </span>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <NavLink to='/login'>Entrar</NavLink>
            </li>
            {/* <li>
              <NavLink to='/register'>Registrar</NavLink>
            </li> */}
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
