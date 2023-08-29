import React, { useState, useEffect } from 'react';

import profileIconPath from '../../images/icons/profile-icon.svg';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import NavigationLink from '../NavigationLink/NavigationLink';

import { PixelWindowWidth } from '../../utils/constants';

export default function Navigation(props) {
  // Get viewport width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Create state for burger menu
  const [isBurgerMenuClicked, setIsBurgerMenuClicked] = useState(false);

  const { isLanding } = props;

  // Get window width on window resize in case of changing mobile orientation
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowWidth > PixelWindowWidth.tablet ? (
    <nav className="navigation">
      <ul className="navigation__links">
        <NavigationLink to="/movies">Фильмы</NavigationLink>
        <NavigationLink to="/saved-movies">Сохраненные фильмы</NavigationLink>
        <NavigationLink to="/profile" linkClass="navigation-link__link_type_profile">
          Аккаунт
          <img className={isLanding ? 'navigation__profile-icon navigation__profile-icon_place_landing' : 'navigation__profile-icon'} src={profileIconPath} alt="Профиль" />
        </NavigationLink>
      </ul>
    </nav>
  ) : (
    <nav className="navigation">
      <div className={`navigation__side-menu-overlay ${isBurgerMenuClicked ? '' : 'navigation_hidden'}`} />
      <ul className={`navigation__side-menu ${isBurgerMenuClicked ? '' : 'navigation_hidden'}`}>
        <div className="navigation__side-menu-wrapper">
          <NavigationLink to="/" linkClass="navigation-link__link_place_side-menu">Главная</NavigationLink>
          <NavigationLink to="/movies" linkClass="navigation-link__link_place_side-menu">Фильмы</NavigationLink>
          <NavigationLink to="/saved-movies" linkClass="navigation-link__link_place_side-menu">Сохраненные фильмы</NavigationLink>
        </div>
        <NavigationLink to="/profile" linkClass="navigation-link__link_place_side-menu-profile">
          Аккаунт
          <img className="navigation__profile-icon" src={profileIconPath} alt="Профиль" />
        </NavigationLink>
      </ul>
      <BurgerMenu setIsClicked={setIsBurgerMenuClicked} isClicked={isBurgerMenuClicked} />
    </nav>
  );
}
