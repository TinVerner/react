import "./Navbar.css";
import { NavLink } from "react-router-dom";

export const Navbar = () => {

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Домашняя страница </NavLink>
        </li>
        <li>
          <NavLink to="/SortTable">Таблица</NavLink>
        </li>
        <li>
          <NavLink to="/Catalog">Каталог</NavLink>
        </li>
        <li>
          <NavLink to="/Search">Поиск</NavLink>
        </li>
        <li>
          <NavLink to="/Order">Корзина</NavLink>
        </li>
      </ul>
    </nav>
  );
};
