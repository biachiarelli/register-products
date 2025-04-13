import { Link, useLocation } from 'react-router-dom';
import './index.scss';
import Logo from '../../assets/images/Logo.png';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <img className="sidebar-logo" src={Logo} alt="Produtos" />
      <nav>
        <ul>
          <li
            className={
              location.pathname === '/products' || location.pathname === '/'
                ? 'active'
                : ''
            }
          >
            <Link to="/products">Lista de Produtos</Link>
          </li>
          <li className={location.pathname === '/form-product' ? 'active' : ''}>
            <Link to="/form-product">Criar Produto</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
