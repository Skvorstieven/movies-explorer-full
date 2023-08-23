import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavigationLink({ to, children, linkClass }) {
  return (
    <li className="navigation-link">
      <NavLink to={to} className={linkClass ? `navigation-link__link ${linkClass}` : 'navigation-link__link'}>
        {children}
      </NavLink>
    </li>
  );
}
