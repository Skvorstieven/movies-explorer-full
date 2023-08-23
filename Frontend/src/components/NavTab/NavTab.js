import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LandingNavigation() {
  return (
    <ul className="nav-tab">
      <li className="nav-tab__link-wrapper">
        <NavLink to="/signup" className="nav-tab__link">
          Регистрация
        </NavLink>
      </li>
      <li className="nav-tab__link-wrapper">
        <NavLink to="/signin" className="nav-tab__link nav-tab__link_type_signin">
          Войти
        </NavLink>
      </li>
    </ul>
  );
}
