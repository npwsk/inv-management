import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/reports">Сформировать отчет</Link>
        <Link to="/about">Справка</Link>
        <Link to="/manual">Руководство</Link>
      </nav>
    </header>
  );
};

export default Header;
