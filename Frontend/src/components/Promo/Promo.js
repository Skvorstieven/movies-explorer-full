import React from 'react';

import promoImagePath from '../../images/promo.svg';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__title-wrapper">
          <h1 className="promo__title">
            Учебный проект студента факультета
            Веб&#8209;разработки.
          </h1>
          <span className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>
        </div>
        <img className="promo__image" src={promoImagePath} alt="Фильмы" />
        <a className="promo__learn-more-button" href="#about-project">Узнать больше</a>
      </div>
    </section>
  );
}
