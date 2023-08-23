import React from 'react';
import { NavLink } from 'react-router-dom';

import logoPath from '../../images/logo/logo.svg';

export default function Logo() {
  return (
    <NavLink to="/">
      <img className="logo" src={logoPath} alt="Логотип" />
    </NavLink>
  );
}
