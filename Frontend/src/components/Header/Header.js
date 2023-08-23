import React from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import NavTab from '../NavTab/NavTab';

export default function Header(props) {
  const { isLanding, isAuthorized } = props;

  return (
    <header className={isLanding ? 'header header_place_landing' : 'header'}>
      <div className="header__wrapper">
        <Logo />

        {isAuthorized ? <Navigation isLanding={isLanding} /> : <NavTab />}
      </div>
    </header>
  );
}
