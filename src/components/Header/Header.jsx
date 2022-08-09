import { NavLink, Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/' className={styles.logo}>
        Dashboard
      </Link>
      <ul className={styles.nav}>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/login'>Entrar</NavLink>
        </li>
        <li>
          <NavLink to='/register'>Registrar</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
