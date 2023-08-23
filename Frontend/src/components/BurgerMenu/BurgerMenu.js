import React from 'react';

export default function BurgerMenu(props) {
  const {
    isClicked,
    setIsClicked,
  } = props;

  // Change Menu state on click
  function onBurgerMenuClick() {
    setIsClicked(!isClicked);
  }

  return (
    <button aria-label="Развернуть" type="button" className="burger-menu" onClick={onBurgerMenuClick}>
      <span className={!isClicked ? 'burger-menu__line' : 'burger-menu__line burger-menu__line_clicked'} />
      <span className={!isClicked ? 'burger-menu__line' : 'burger-menu__line burger-menu__line_clicked'} />
      <span className={!isClicked ? 'burger-menu__line' : 'burger-menu__line burger-menu__line_clicked'} />
    </button>
  );
}
