// Footer Module
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</div>

      <div className="footer__wrapper">

        <p className="footer__copyright">
          <span>&#169;</span>
          {currentYear}
        </p>

        <div className="footer__links">
          <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link" href="https://github.com/Skvorstieven" target="_blank" rel="noreferrer">Github</a>
        </div>

      </div>

    </footer>
  );
}
